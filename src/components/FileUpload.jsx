import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiX, FiFile, FiCheck, FiAlertCircle } from "react-icons/fi";

const FileUpload = ({ onFilesUpload, onClose }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError(null);

    if (rejectedFiles.length > 0) {
      setError(
        "Some files were rejected. Only images, documents, and PDFs are allowed."
      );
    }

    const newFiles = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      status: "pending",
    }));

    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 50 * 1024 * 1024, // 50MB
    multiple: true,
  });

  const removeFile = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress({});

    try {
      // Call the parent component's upload handler
      await onFilesUpload(files);
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upload Files</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            disabled={isUploading}
          >
            <FiX size={24} />
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <input {...getInputProps()} />
          <FiUpload className="mx-auto text-3xl text-gray-400 mb-3" />
          <p className="text-lg font-medium text-gray-700">
            {isDragActive
              ? "Drop files here"
              : "Drag & drop files here, or click to select"}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Supports: JPG, PNG, GIF, PDF, DOC, DOCX, TXT (Max 50MB each)
          </p>
        </div>

        {error && (
          <div className="mt-4 flex items-center bg-red-50 text-red-600 p-3 rounded-md">
            <FiAlertCircle className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Selected Files ({files.length})
            </h3>

            <div className="space-y-3 max-h-48 overflow-y-auto">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="border border-gray-200 rounded-lg p-4 flex items-center"
                >
                  <div className="bg-blue-100 p-2 rounded-md mr-4">
                    <FiFile className="text-blue-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {file.name}
                      </p>
                      <span className="text-xs text-gray-500 ml-2">
                        {formatFileSize(file.size)}
                      </span>
                    </div>

                    {uploadProgress[file.id] !== undefined && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              file.status === "completed"
                                ? "bg-green-500"
                                : "bg-blue-500"
                            }`}
                            style={{ width: `${uploadProgress[file.id]}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>
                            {file.status === "completed"
                              ? "Uploaded"
                              : "Uploading..."}
                          </span>
                          <span>
                            {Math.min(100, Math.round(uploadProgress[file.id]))}
                            %
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {file.status !== "completed" && (
                    <button
                      onClick={() => removeFile(file.id)}
                      className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                      disabled={isUploading}
                    >
                      <FiX />
                    </button>
                  )}

                  {file.status === "completed" && (
                    <div className="ml-4 text-green-500">
                      <FiCheck />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setFiles([])}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isUploading}
              >
                Clear All
              </button>
              <button
                onClick={uploadFiles}
                className={`px-4 py-2 rounded-md text-white ${
                  isUploading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } transition-colors flex items-center`}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  `Upload ${files.length} File${files.length !== 1 ? "s" : ""}`
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
