import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiX, FiFile, FiCheck, FiAlertCircle } from "react-icons/fi";
import axios from "axios";
import { formatSize } from "../utils/formatFileSize";
// Import your service calls.
// Ensure uploadComplete is defined in your driveService alongside uploadInitiate
import { uploadInitiate, uploadComplete } from "../services/driveService";
import useApi from "../hooks/useApi";

const FileUpload = ({ currentFolderId, onClose, onRefresh }) => {
  const [file, setFile] = useState(null); // Changed to hold a single object, not array
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState("idle"); // 'idle', 'uploading', 'completed', 'error'
  const [error, setError] = useState(null);
  const { execute: uploadInitiateHandler } = useApi(uploadInitiate, {});
  const { execute: uploadCompleteHandler } = useApi(uploadComplete, {});

  // 1. Handle File Selection
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError(null);
    setStatus("idle");
    setUploadProgress(0);

    if (rejectedFiles.length > 0) {
      setError("File rejected. Please check the file type or size.");
      return;
    }

    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile({
        rawFile: selectedFile, // The actual File object for Axios
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
      });
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // RESTRICT TO SINGLE FILE
    maxFiles: 1,
  });

  const handleRemoveFile = () => {
    setFile(null);
    setStatus("idle");
    setError(null);
  };

  // 2. Main Upload Logic
  const handleUpload = async () => {
    if (!file) return;

    setStatus("uploading");
    setError(null);

    try {
      // --- STEP A: INITIATE (Backend) ---
      // Request a Pre-Signed URL from your Node.js backend
      const initData = await uploadInitiateHandler({
        name: file.name,
        size: file.size,
        contentType: file.type, // Crucial for S3 signature matching
        parentDirId: currentFolderId,
      });

      console.log(initData);
      // Expecting response: { signedUrl, fileKey, uploadId }
      const { signedUrl, fileKey } = initData;

      // --- STEP B: UPLOAD TO S3 (Direct) ---
      // Note: We use axios directly here because this request goes to AWS, not your backend
      await axios.put(signedUrl, file.rawFile, {
        headers: {
          "Content-Type": file.type, // MUST match what you sent in Step A
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percent);
        },
      });

      // --- STEP C: COMPLETE (Backend) ---
      // Tell backend the upload is done so it can save the file metadata to MongoDB
      await uploadCompleteHandler({
        fileKey,
        name: file.name,
        size: file.size,
        parentFolderId: currentFolderId,
        type: file.type,
      });

      setStatus("completed");

      // Refresh the drive list
      onRefresh();

      // Optional: Close modal after short delay
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (err) {
      console.error("Upload flow failed:", err);
      setStatus("error");
      setError(err.response?.data?.message || err.message || "Upload failed");
    }
  };

  return (
    <div
      className="fixed inset-0 top-0 left-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm dark:bg-white/10 dark:backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900 dark:shadow-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Upload File
          </h2>
          <button
            onClick={onClose}
            disabled={status === "uploading"}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Dropzone - Only show if no file is selected */}
        {!file && (
          <div
            {...getRootProps()}
            className={`cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition-all ${
              isDragActive
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-300 hover:border-blue-400 dark:border-gray-700"
            }`}
          >
            <input {...getInputProps()} />
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900/30">
                <FiUpload className="text-3xl text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
              Drag & drop a file here
            </p>
            <p className="mt-2 text-sm text-gray-500">or click to browse</p>
          </div>
        )}

        {/* Selected File View */}
        {file && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="rounded bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <FiFile size={20} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>

              {/* Remove button (only if not uploading/completed) */}
              {status === "idle" || status === "error" ? (
                <button
                  onClick={handleRemoveFile}
                  className="text-gray-400 hover:text-red-500"
                >
                  <FiX size={20} />
                </button>
              ) : status === "completed" ? (
                <FiCheck className="text-green-500" size={20} />
              ) : null}
            </div>

            {/* Progress Bar */}
            {(status === "uploading" || status === "completed") && (
              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs text-gray-500">
                  <span>
                    {status === "completed" ? "Uploaded" : "Uploading..."}
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className={`h-full transition-all duration-300 ${
                      status === "completed" ? "bg-green-500" : "bg-blue-600"
                    }`}
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Error Message */}
            {status === "error" && (
              <div className="mt-3 flex items-center text-xs text-red-500">
                <FiAlertCircle className="mr-1" />
                <span>{error}</span>
              </div>
            )}
          </div>
        )}

        {/* Global Error (Dropzone rejection) */}
        {!file && error && (
          <div className="mt-4 flex items-center rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20">
            <FiAlertCircle className="mr-2" />
            {error}
          </div>
        )}

        {/* Footer Actions */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            disabled={status === "uploading"}
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={!file || status === "uploading" || status === "completed"}
            className={`flex items-center rounded-lg px-6 py-2 text-sm font-medium text-white transition-all ${
              !file || status === "uploading" || status === "completed"
                ? "cursor-not-allowed bg-blue-300 dark:bg-blue-800"
                : "bg-blue-600 shadow-lg shadow-blue-500/30 hover:bg-blue-700"
            }`}
          >
            {status === "uploading" ? "Uploading..." : "Upload File"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;

// import { useState, useCallback } from "react";
// import { useDropzone } from "react-dropzone";
// import { FiUpload, FiX, FiFile, FiCheck, FiAlertCircle } from "react-icons/fi";
// import { formatSize } from "../utils/formatFileSize";
// import useApi from "../hooks/useApi";
// import { uploadFiles } from "../services/driveService";

// const FileUpload = ({ currentFolderId, onClose, onRefresh }) => {
//   const [files, setFiles] = useState([]);
//   const [uploadProgress, setUploadProgress] = useState({});
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState(null);
//   const { execute: uploadFilesHandler } = useApi(uploadFiles, {});

//   const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
//     setError(null);

//     if (rejectedFiles.length > 0) {
//       setError(
//         "Some files were rejected. Only images, documents, and PDFs are allowed.",
//       );
//     }

//     const newFiles = acceptedFiles.map((file) => ({
//       file,
//       id: Math.random().toString(36).substring(2, 9),
//       name: file.name,
//       size: file.size,
//       type: file.type,
//       status: "pending",
//     }));

//     setFiles((prevFiles) => [...prevFiles, ...newFiles]);
//   }, []);

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop,
//     // maxSize: 250 * 1024 * 1024, // 250MB
//     multiple: true,
//   });

//   const removeFile = (id) => {
//     setFiles(files.filter((file) => file.id !== id));
//   };

//   const handleUploadFilesHandler = async () => {
//     if (files.length === 0) return;

//     setIsUploading(true);

//     const formData = new FormData();
//     files.forEach((file) => formData.append("files", file.file));

//     if (currentFolderId) formData.append("parentFolderId", currentFolderId);

//     setUploadProgress({});
//     try {
//       await uploadFilesHandler(formData);
//       onRefresh();
//       onClose();
//     } catch (error) {
//       console.error("Upload error:", error);
//       setError(error.message || "Failed to upload files. Please try again.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 top-0 left-0 z-50 overflow-y-scroll bg-black/20 dark:bg-white/20"
//       onClick={onClose}
//     >
//       <div className="flex min-h-full items-center justify-center p-4">
//         <div
//           className="w-full max-w-lg rounded-lg bg-gray-50 p-6 shadow dark:bg-gray-900"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="mb-4 flex items-center justify-between">
//             <h2 className="text-xl font-semibold">Upload Files</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700"
//               disabled={isUploading}
//             >
//               <FiX size={24} />
//             </button>
//           </div>

//           <div
//             {...getRootProps()}
//             className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
//               isDragActive
//                 ? "border-blue-500 bg-blue-50"
//                 : "border-gray-300 hover:border-blue-400"
//             }`}
//           >
//             <input {...getInputProps()} />
//             <FiUpload className="mx-auto mb-3 text-3xl text-gray-400" />
//             <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
//               {isDragActive
//                 ? "Drop files here"
//                 : "Drag & drop files here, or click to select"}
//             </p>
//             <p className="mt-1 text-sm text-gray-500">
//               Supports: JPG, PNG, GIF, PDF, DOC, DOCX, TXT (Max 50MB each)
//             </p>
//           </div>

//           {error && (
//             <div className="mt-4 flex items-center rounded-md bg-red-50 p-3 text-red-600">
//               <FiAlertCircle className="mr-2" />
//               <span>{error}</span>
//             </div>
//           )}

//           {files.length > 0 && (
//             <div className="mt-6">
//               <h3 className="mb-3 text-lg font-medium text-gray-950 dark:text-gray-50">
//                 Selected Files ({files.length})
//               </h3>

//               <div className="max-h-48 space-y-3 overflow-y-auto">
//                 {files.map((file) => (
//                   <div
//                     key={file.id}
//                     className="flex items-center rounded-lg border border-gray-200 p-4"
//                   >
//                     <div className="mr-4 rounded-md bg-blue-100 p-2">
//                       <FiFile className="text-blue-600" />
//                     </div>

//                     <div className="min-w-0 flex-1">
//                       <div className="flex items-baseline justify-between">
//                         <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">
//                           {file.name}
//                         </p>
//                         <span className="ml-2 text-xs text-nowrap text-gray-700 dark:text-gray-300">
//                           {formatSize(file.size)}
//                         </span>
//                       </div>

//                       {uploadProgress[file.id] !== undefined && (
//                         <div className="mt-2">
//                           <div className="h-1.5 w-full rounded-full bg-gray-200">
//                             <div
//                               className={`h-1.5 rounded-full ${
//                                 file.status === "completed"
//                                   ? "bg-green-500"
//                                   : "bg-blue-500"
//                               }`}
//                               style={{ width: `${uploadProgress[file.id]}%` }}
//                             ></div>
//                           </div>
//                           <div className="mt-1 flex justify-between text-xs text-gray-500">
//                             <span>
//                               {file.status === "completed"
//                                 ? "Uploaded"
//                                 : "Uploading..."}
//                             </span>
//                             <span>
//                               {Math.min(
//                                 100,
//                                 Math.round(uploadProgress[file.id]),
//                               )}
//                               %
//                             </span>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {file.status !== "completed" && (
//                       <button
//                         onClick={() => removeFile(file.id)}
//                         className="ml-4 text-gray-700 transition-colors hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-400"
//                         disabled={isUploading}
//                       >
//                         <FiX />
//                       </button>
//                     )}

//                     {file.status === "completed" && (
//                       <div className="ml-4 text-green-500">
//                         <FiCheck />
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   onClick={() => setFiles([])}
//                   className="rounded-md border border-gray-500 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-700"
//                   disabled={isUploading}
//                 >
//                   Clear All
//                 </button>
//                 <button
//                   onClick={handleUploadFilesHandler}
//                   className={`rounded-md px-4 py-2 text-white ${
//                     isUploading
//                       ? "cursor-not-allowed bg-blue-400"
//                       : "bg-blue-600 hover:bg-blue-700"
//                   } flex items-center transition-colors`}
//                   disabled={isUploading}
//                 >
//                   {isUploading ? (
//                     <>
//                       <svg
//                         className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Uploading...
//                     </>
//                   ) : (
//                     `Upload ${files.length} File${files.length !== 1 ? "s" : ""}`
//                   )}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileUpload;
