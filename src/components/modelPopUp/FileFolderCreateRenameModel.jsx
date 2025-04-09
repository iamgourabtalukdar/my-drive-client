import React, { useState } from "react";
import { useParams } from "react-router";
import { capitalize } from "../../utils/stringOperations";

const reqObjList = {
  "create new": {
    folder: {
      method: "POST",
      url: () => `${import.meta.env.VITE_API_BASE_URL}/folder`,
      body: (folderName) => JSON.stringify({ name: folderName.trim() }),
    },
  },
  rename: {
    folder: {
      method: "PATCH",
      url: (item) => `${import.meta.env.VITE_API_BASE_URL}/folder/${item.id}`,
      body: (newName) => JSON.stringify({ newName: newName.trim() }),
    },
    file: {
      method: "PATCH",
      url: (item) => `${import.meta.env.VITE_API_BASE_URL}/file/${item.id}`,
      body: (newName) => JSON.stringify({ newName: newName.trim() }),
    },
  },
};
const FileFolderCreateRenameModel = ({
  newFolderModel,
  isOpen,
  onCloseHandler,
  fetchFolderData,
}) => {
  const [itemName, setItemName] = useState(
    newFolderModel.item ? newFolderModel.item.name : ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const folderId = params.folderId || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!itemName.trim()) {
      setError("Name cannot be empty");
      return;
    }

    if (newFolderModel.type === "folder" && itemName.length > 30) {
      setError("Name cannot exceed 30 characters");
      return;
    }
    if (newFolderModel.type === "file" && itemName.length > 50) {
      setError("Name cannot exceed 50 characters");
      return;
    }

    //sending request to server
    setIsLoading(true);
    const reqObj = reqObjList[newFolderModel.action][newFolderModel.type];

    const response = await fetch(reqObj.url(newFolderModel.item), {
      method: reqObj.method,
      body: reqObj.body(itemName),
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "Parent-Folder-Id": folderId,
      },
    });
    const data = await response.json();
    if (data.status) {
      setItemName("");
      onCloseHandler();
      fetchFolderData();
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
          <h3 className="text-lg font-medium">
            {capitalize(`${newFolderModel.action} ${newFolderModel.type}`)}
          </h3>
          <button
            onClick={onCloseHandler}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4 relative">
            <label
              htmlFor="itemName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {capitalize(newFolderModel.type)} name
            </label>
            <input
              id="itemName"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder={`Enter ${capitalize(newFolderModel.type)} name`}
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
              {isLoading
                ? "Creating..."
                : `${capitalize(newFolderModel.action)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileFolderCreateRenameModel;
