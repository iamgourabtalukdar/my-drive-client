import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { capitalize } from "../../utils/stringOperations";
import { DriveContext } from "../../contexts/DriveContext";
// import { useDriveData } from "../../hooks/useDriveData";

// const reqObjList = {
//   "create new": {
//     folder: {
//       method: "POST",
//       url: () => `${import.meta.env.VITE_API_BASE_URL}/folder`,
//       body: (folderName) => JSON.stringify({ name: folderName.trim() }),
//     },
//   },
//   rename: {
//     folder: {
//       method: "PATCH",
//       url: (item) => `${import.meta.env.VITE_API_BASE_URL}/folder/${item.id}`,
//       body: (newName) => JSON.stringify({ newName: newName.trim() }),
//     },
//     file: {
//       method: "PATCH",
//       url: (item) => `${import.meta.env.VITE_API_BASE_URL}/file/${item.id}`,
//       body: (newName) => JSON.stringify({ newName: newName.trim() }),
//     },
//   },
// };
const FileFolderCreateRenameModel = ({ fileFolderModel }) => {
  if (!fileFolderModel.isVisible) return null;

  const {
    createNewFolder,
    renameFolder,
    renameFile,
    setFileFolderModel,
    loading,
    error,
    setError,
  } = useContext(DriveContext);

  const [itemName, setItemName] = useState(
    fileFolderModel.item ? fileFolderModel.item.name : ""
  );

  const closeHandler = () => {
    setFileFolderModel({ isVisible: false });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    //sending request to server

    try {
      if (fileFolderModel.action === "create new") {
        if (fileFolderModel.type === "folder") {
          await createNewFolder(itemName);
        }
      } else if (fileFolderModel.action === "rename") {
        if (fileFolderModel.type === "folder") {
          await renameFolder(itemName);
        } else if (fileFolderModel.type === "file") {
          await renameFile(itemName);
        }
      }
      setItemName("");
      closeHandler();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/20  flex items-center justify-center z-50"
      onClick={() => {
        setFileFolderModel({ isVisible: false });
        setError("");
      }}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium">
            {capitalize(`${fileFolderModel.action} ${fileFolderModel.type}`)}
          </h3>
          <button
            onClick={closeHandler}
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
              {capitalize(fileFolderModel.type)} name
            </label>
            <input
              id="itemName"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder={`Enter ${capitalize(fileFolderModel.type)} name`}
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
              onClick={closeHandler}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loading
                ? "Processing..."
                : `${capitalize(fileFolderModel.action)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileFolderCreateRenameModel;
