import { useState } from "react";
import { capitalize } from "../../utils/stringOperations";
import useApi from "../../hooks/useApi";
import driveService from "../../services/driveService";
import { toast } from "react-toastify";

const CreatePopUp = ({ setIsCreatePopUp, data, onSuccess }) => {
  // API hooks for creating and renaming
  const {
    loading: folderCreationLoading,
    error: folderCreationError,
    execute: createFolder,
  } = useApi(driveService.createFolder);

  const {
    loading: folderRenameLoading,
    error: folderRenameError,
    execute: renameFolder,
  } = useApi(driveService.renameFolder);

  const [itemName, setItemName] = useState(data?.item?.name || "");

  // Combine loading and error states for simplicity
  const isLoading = folderCreationLoading || folderRenameLoading;
  const error = folderCreationError || folderRenameError;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName.trim()) return; // Prevent submission of empty names

    try {
      if (data.action === "create new" && data.type === "folder") {
        const parentFolderId = data.item?.parentFolderId;
        console.log(parentFolderId);
        await createFolder({ name: itemName, parentFolderId: parentFolderId });
      } else if (data.action === "rename" && data.type === "folder") {
        await renameFolder(data.item.id, { name: itemName });
      }

      // If API call was successful, close popup and refresh parent component
      setItemName("");
      setIsCreatePopUp(false);

      if (onSuccess) {
        onSuccess();
      }
    } catch (apiError) {
      toast.error(apiError.message || "An error occurred. Please try again.");
    }
  };

  // Dynamic text based on the action (create or rename)
  const title = capitalize(`${data.action} ${data.type}`);
  const buttonText = data.action === "rename" ? "Rename" : "Create";
  const loadingText = data.action === "rename" ? "Renaming..." : "Creating...";

  // **Check if the input is unchanged during a rename operation**
  const isUnchanged =
    data.action === "rename" && itemName.trim() === data.item.name;

  // **Combine all conditions for disabling the button**
  const isButtonDisabled = isLoading || !itemName.trim() || isUnchanged;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={() => setIsCreatePopUp(false)}
    >
      <div
        className="w-full max-w-md rounded-lg bg-color shadow-color-sm dark:bg-sub-color"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={() => setIsCreatePopUp(false)} className="text-2xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="relative mb-4">
            <label
              htmlFor="itemName"
              className="mb-2 block text-sm font-medium"
            >
              {capitalize(data.type)} name
            </label>
            <input
              id="itemName"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder={`Enter ${data.type} name`}
              className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            {error && (
              <div className="absolute left-1 top-[105%] mb-4 text-sm text-red-600">
                {error.message || "An error occurred. Please try again."}
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsCreatePopUp(false)}
              className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
