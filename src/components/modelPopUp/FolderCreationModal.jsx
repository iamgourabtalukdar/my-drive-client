import React, { useState } from "react";
import { useParams } from "react-router";

const FolderCreationModal = ({ isOpen, onCloseHandler }) => {
  const [folderName, setFolderName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const folderId = params.folderId || "";

  const createNewFolderHandler = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!folderName.trim()) {
      setError("Folder name cannot be empty");
      return;
    }

    if (folderName.length > 30) {
      setError("Folder name cannot exceed 30 characters");
      return;
    }

    setIsLoading(true);
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/folder`,
      {
        method: "POST",
        body: JSON.stringify({ name: folderName.trim() }),
        credentials: "include",
        headers: {
          "content-type": "application/json",
          "Parent-Folder-Id": folderId,
        },
      }
    );
    const data = await response.json();
    if (response.status === 201) {
      setFolderName("");
      onCloseHandler();
    } else {
      setError(data.errors.message);
    }
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20  flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">Create New Folder</h3>
          <button
            onClick={onCloseHandler}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={createNewFolderHandler} className="p-6">
          <div className="mb-4 relative">
            <label
              htmlFor="folderName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Folder Name
            </label>
            <input
              id="folderName"
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            {error && (
              <div className="mb-4 text-sm text-red-600 absolute top-[105%] left-1">
                {error}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onCloseHandler}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FolderCreationModal;
