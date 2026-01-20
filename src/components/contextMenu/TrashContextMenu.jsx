import { MdDeleteForever, MdOutlineRestore } from "react-icons/md";
import { useOutletContext } from "react-router";
import toast from "react-hot-toast";
import { deleteFile, updateFile } from "../../services/file.service";
import { deleteFolder, updateFolder } from "../../services/folder.service";
import { asyncHandler } from "../../utils/asyncHandler";

const TrashContextMenu = ({ targetItem, onRefresh = () => {} }) => {
  const { setStorageInfo } = useOutletContext();

  const deleteHandler = asyncHandler(
    async ({ type, id, callbackFn, message, size }) => {
      await callbackFn(id);
      setStorageInfo((prev) => ({
        ...prev,
        usedStorage: prev.usedStorage - size,
      }));
      onRefresh();
      toast.success(message || `${type} deleted successfully!`);
    },
    {
      onError: (error) => {
        console.error("Error in deleteHandler:", error);
        toast.error(`Failed to delete ${type}.`);
      },
    },
  );

  const restoreHandler = asyncHandler(
    async ({ type, id, payload, callbackFn, message }) => {
      await callbackFn(id, payload);
      onRefresh();
      toast.success(message || `${type} restored successfully!`);
    },
    {
      onError: (error) => {
        console.error("Error in restoreHandler:", error);
        toast.error(`Failed to restore ${type}. Please try again.`);
      },
    },
  );

  return (
    <>
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-900"
        title="Restore"
        onClick={() =>
          restoreHandler({
            type: targetItem.type,
            id: targetItem.id,
            payload: { isTrashed: false },
            message: `${targetItem.type} restored successfully!`,
            callbackFn: targetItem.type === "file" ? updateFile : updateFolder,
          })
        }
      >
        <MdOutlineRestore className="text-xl" />
        <span>Restore</span>
      </button>
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-900"
        title="Delete Forever"
        onClick={() =>
          deleteHandler({
            type: targetItem.type,
            id: targetItem.id,
            callbackFn: targetItem.type === "file" ? deleteFile : deleteFolder,
            message: `${targetItem.type} deleted forever!`,
            size: targetItem.size || 0,
          })
        }
      >
        <MdDeleteForever className="text-xl" />
        <span>Delete Forever</span>
      </button>
    </>
  );
};
export default TrashContextMenu;
