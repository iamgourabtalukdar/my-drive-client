import { useState } from "react";
import { toast } from "react-toastify";
import { updateFile } from "../../services/file.service";
import { createFolder, updateFolder } from "../../services/folder.service";

const CreatePopUp = ({ popUp, setPopUp, onSuccess }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [itemName, setItemName] = useState(popUp.data?.name || "");

  const apiHandler = async ({
    payload,
    apiFunction,
    successMessage,
    paramsCallback,
  }) => {
    try {
      setIsLoading(true);

      await apiFunction(...paramsCallback(payload));
      if (onSuccess) {
        onSuccess();
      }
      setPopUp(null);
      setItemName("");
      toast.success(successMessage || "Operation successful!");
    } catch (err) {
      const error = err.response?.data || {};
      toast.error(
        error.error?.message ||
          "Failed to perform operation. Please try again.",
      );

      setError(error.error.fields.body || {});
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (popUp.actionType === "create_folder") {
      await apiHandler({
        payload: {
          name: itemName,
          parentFolderId: popUp.data?.parentFolderId || null,
        },
        apiFunction: createFolder,
        successMessage: "Folder created successfully!",
        paramsCallback: (data) => [data],
      });
    } else if (popUp.actionType === "rename_folder") {
      await apiHandler({
        payload: {
          name: itemName,
          folderId: popUp.data.folderId,
        },
        apiFunction: updateFolder,
        successMessage: "Folder updated successfully!",
        paramsCallback: (data) => [popUp.data.folderId, data],
      });
    } else if (popUp.actionType === "rename_file") {
      await apiHandler({
        payload: {
          name: itemName,
        },
        apiFunction: updateFile,
        successMessage: "File updated successfully!",
        paramsCallback: (data) => [popUp.data.fileId, data],
      });
    }
  };

  const buttonText = popUp.actionType.startsWith("create")
    ? "Create"
    : "Rename";
  const loadingText = popUp.actionType.startsWith("create")
    ? "Creating..."
    : "Renaming...";

  // **Check if the input is unchanged during a rename operation**
  const isUnchanged =
    popUp.actionType.startsWith("rename") &&
    itemName.trim() === popUp.data.name;

  // **Combine all conditions for disabling the button**
  const isButtonDisabled = isLoading || !itemName.trim() || isUnchanged;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 dark:bg-white/20"
      onClick={() => setPopUp(null)}
    >
      <div
        className="w-full max-w-md rounded-lg bg-gray-50 shadow dark:bg-gray-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-medium">{popUp.title}</h3>
          <button onClick={() => setPopUp(null)} className="text-2xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="relative mb-4">
            <label
              htmlFor="itemName"
              className="mb-2 block text-sm font-medium"
            >
              {popUp.subText}
            </label>
            <input
              id="itemName"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder={popUp.placeholder}
              className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              autoFocus
            />
            {error && (
              <div className="absolute top-[105%] left-1 mb-4 text-sm text-red-600">
                {error.name || "An error occurred. Please try again."}
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setPopUp(null)}
              className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                isButtonDisabled ? "cursor-not-allowed opacity-75" : ""
              }`}
            >
              {isLoading ? loadingText : buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePopUp;
