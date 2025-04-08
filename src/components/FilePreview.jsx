import { useState } from "react";
import {
  FiFile,
  FiImage,
  FiVideo,
  FiMusic,
  FiDownload,
  FiShare2,
  FiMoreVertical,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const FilePreview = ({ file, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock file data - in a real app this would come from props or API
  const fileData = file || {
    id: "1",
    name: "Sample Document.pdf",
    type: "pdf",
    size: "2.4 MB",
    lastModified: "2 days ago",
    owner: "you",
    pages: 12,
    thumbnail: "https://via.placeholder.com/800x1000/eee?text=Document+Preview",
  };

  const renderFileIcon = () => {
    switch (fileData.type) {
      case "pdf":
        return <FiFile className="text-red-500 text-4xl" />;
      case "jpg":
      case "png":
      case "gif":
        return <FiImage className="text-green-500 text-4xl" />;
      case "mp4":
      case "mov":
        return <FiVideo className="text-blue-500 text-4xl" />;
      case "mp3":
      case "wav":
        return <FiMusic className="text-purple-500 text-4xl" />;
      default:
        return <FiFile className="text-gray-500 text-4xl" />;
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < fileData.pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            {renderFileIcon()}
            <div>
              <h2 className="text-lg font-medium">{fileData.name}</h2>
              <p className="text-sm text-gray-500">
                {fileData.size} • {fileData.lastModified} • {fileData.owner}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FiDownload className="text-gray-600" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setShowShareModal(true)}
            >
              <FiShare2 className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FiMoreVertical className="text-gray-600" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={onClose}
            >
              <FiX className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-8 bg-gray-50">
          {fileData.type === "pdf" ? (
            <div className="relative">
              <img
                src={fileData.thumbnail}
                alt={`Page ${currentPage} of ${fileData.name}`}
                className="max-h-[70vh] shadow-lg"
              />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="bg-white rounded-full shadow-md flex items-center px-4 py-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`p-1 ${
                      currentPage === 1 ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    <FiChevronLeft />
                  </button>
                  <span className="mx-4 text-sm">
                    Page {currentPage} of {fileData.pages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === fileData.pages}
                    className={`p-1 ${
                      currentPage === fileData.pages
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    <FiChevronRight />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <img
              src={fileData.thumbnail}
              alt={fileData.name}
              className="max-h-[70vh] max-w-full object-contain"
            />
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {fileData.type.toUpperCase()} • {fileData.size}
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Open with
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              Download
            </button>
          </div>
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Share "{fileData.name}"</h3>
                <button onClick={() => setShowShareModal(false)}>
                  <FiX className="text-gray-500" />
                </button>
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Add people or groups"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <span className="text-sm text-gray-500">
                    Share with specific people
                  </span>
                </div>
                <select className="border rounded p-1 text-sm">
                  <option>Editor</option>
                  <option>Commenter</option>
                  <option>Viewer</option>
                </select>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  className="px-4 py-2 text-gray-700 rounded hover:bg-gray-100"
                  onClick={() => setShowShareModal(false)}
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilePreview;
