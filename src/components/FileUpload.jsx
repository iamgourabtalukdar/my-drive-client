import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiUpload, FiX, FiFile, FiCheck, FiAlertCircle } from "react-icons/fi";
import { formatSize } from "../utils/formatFileSize";
import useApi from "../hooks/useApi";
import { uploadFiles } from "../services/driveService";

const FileUpload = ({ currentFolderId, onClose, onRefresh }) => {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const { execute: uploadFilesHandler } = useApi(uploadFiles, {});

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError(null);

    if (rejectedFiles.length > 0) {
      setError(
        "Some files were rejected. Only images, documents, and PDFs are allowed.",
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
    // maxSize: 250 * 1024 * 1024, // 250MB
    multiple: true,
  });

  const removeFile = (id) => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const handleUploadFilesHandler = async () => {
    if (files.length === 0) return;

    setIsUploading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file.file));

    if (currentFolderId) formData.append("parentFolderId", currentFolderId);

    setUploadProgress({});
    try {
      await uploadFilesHandler(formData);
      onRefresh();
      onClose();
    } catch (error) {
      console.error("Upload error:", error);
      setError(error.message || "Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 top-0 left-0 z-50 overflow-y-scroll bg-black/20 dark:bg-white/20"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className="w-full max-w-lg rounded-lg bg-gray-50 p-6 shadow dark:bg-gray-900"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between">
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
            className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <input {...getInputProps()} />
            <FiUpload className="mx-auto mb-3 text-3xl text-gray-400" />
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {isDragActive
                ? "Drop files here"
                : "Drag & drop files here, or click to select"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Supports: JPG, PNG, GIF, PDF, DOC, DOCX, TXT (Max 50MB each)
            </p>
          </div>

          {error && (
            <div className="mt-4 flex items-center rounded-md bg-red-50 p-3 text-red-600">
              <FiAlertCircle className="mr-2" />
              <span>{error}</span>
            </div>
          )}

          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-lg font-medium text-gray-950 dark:text-gray-50">
                Selected Files ({files.length})
              </h3>

              <div className="max-h-48 space-y-3 overflow-y-auto">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center rounded-lg border border-gray-200 p-4"
                  >
                    <div className="mr-4 rounded-md bg-blue-100 p-2">
                      <FiFile className="text-blue-600" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between">
                        <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">
                          {file.name}
                        </p>
                        <span className="ml-2 text-xs text-nowrap text-gray-700 dark:text-gray-300">
                          {formatSize(file.size)}
                        </span>
                      </div>

                      {uploadProgress[file.id] !== undefined && (
                        <div className="mt-2">
                          <div className="h-1.5 w-full rounded-full bg-gray-200">
                            <div
                              className={`h-1.5 rounded-full ${
                                file.status === "completed"
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                              }`}
                              style={{ width: `${uploadProgress[file.id]}%` }}
                            ></div>
                          </div>
                          <div className="mt-1 flex justify-between text-xs text-gray-500">
                            <span>
                              {file.status === "completed"
                                ? "Uploaded"
                                : "Uploading..."}
                            </span>
                            <span>
                              {Math.min(
                                100,
                                Math.round(uploadProgress[file.id]),
                              )}
                              %
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {file.status !== "completed" && (
                      <button
                        onClick={() => removeFile(file.id)}
                        className="ml-4 text-gray-700 transition-colors hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-400"
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
                  className="rounded-md border border-gray-500 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-300 dark:text-gray-300 dark:hover:bg-gray-700"
                  disabled={isUploading}
                >
                  Clear All
                </button>
                <button
                  onClick={handleUploadFilesHandler}
                  className={`rounded-md px-4 py-2 text-white ${
                    isUploading
                      ? "cursor-not-allowed bg-blue-400"
                      : "bg-blue-600 hover:bg-blue-700"
                  } flex items-center transition-colors`}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <>
                      <svg
                        className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
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
    </div>
  );
};

export default FileUpload;
