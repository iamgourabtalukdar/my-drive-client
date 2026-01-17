import axios from "axios";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiAlertCircle, FiCheck, FiFile, FiUpload, FiX } from "react-icons/fi";
import { formatSize } from "../utils/formatFileSize";
import { useOutletContext } from "react-router";
import { uploadComplete, uploadInitiate } from "../services/file.service";

const FileUpload = ({ currentFolderId, onClose, onRefresh }) => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState("idle"); // 'idle', 'uploading', 'completed', 'error'
  const [error, setError] = useState(null);
  const { setStorageInfo } = useOutletContext();

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
      const { data } = await uploadInitiate({
        name: file.name,
        size: file.size,
        contentType: file.type,
        parentFolderId: currentFolderId,
      });

      // Expecting response: { signedUrl, fileKey, uploadId }
      const { uploadId, signedUrl } = data;

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
      await uploadComplete({
        uploadId,
      });

      setStatus("completed");

      // Refresh the drive list
      onRefresh();

      // Optional: Close modal after short delay
      setTimeout(() => {
        onClose();
        setStorageInfo((prev) => ({
          ...prev,
          usedStorage: prev.usedStorage + file.size,
        }));
      }, 200);
    } catch (err) {
      console.log(err);
      console.error("Upload flow failed:", err);
      setStatus("error");
      setError(
        err.response?.data?.error?.message || err.message || "Upload failed",
      );
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
            className={`${status === "uploading" ? "cursor-not-allowed opacity-50" : ""} rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800`}
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
