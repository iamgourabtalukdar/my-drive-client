import React, { useState } from "react";
import { capitalize } from "../../utils/stringOperations";

const FileFolderCreateRenameModel = ({
  fileFolderModel,
  setFileFolderModel,
  onAddFolder,
  onRenameItem,
}) => {
  if (!fileFolderModel.isVisible) return null;

  const [itemName, setItemName] = useState(
    fileFolderModel.item ? fileFolderModel.item.name : "",
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const closeHandler = () => {
    setFileFolderModel({ isVisible: false });
    setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    //sending request to server

    try {
      setLoading(true);
      if (fileFolderModel.action === "create new") {
        if (fileFolderModel.type === "folder") {
          await onAddFolder(itemName);
        }
      } else if (fileFolderModel.action === "rename") {
        await onRenameItem(
          fileFolderModel.type,
          fileFolderModel.item.id,
          itemName,
        );
      }
      setItemName("");
      closeHandler();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={() => {
        setFileFolderModel({ isVisible: false });
        setError("");
      }}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-medium">
            {capitalize(`${fileFolderModel.action} ${fileFolderModel.type}`)}
          </h3>
          <button
            onClick={closeHandler}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="relative mb-4">
            <label
              htmlFor="itemName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              {capitalize(fileFolderModel.type)} name
            </label>
            <input
              id="itemName"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder={`Enter ${capitalize(fileFolderModel.type)} name`}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            {error && (
              <div className="absolute left-1 top-[105%] mb-4 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={closeHandler}
              className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                loading ? "cursor-not-allowed opacity-75" : ""
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
