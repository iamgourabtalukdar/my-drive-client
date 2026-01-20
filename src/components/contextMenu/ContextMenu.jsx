import {
  MdDelete,
  MdEdit,
  MdFolderOpen,
  MdOpenInNew,
  MdStar,
  MdStarOutline,
} from "react-icons/md";
import toast from "react-hot-toast";
import { updateFolder } from "../../services/folder.service";
import { useNavigate, useOutletContext } from "react-router";
import { getFile, updateFile } from "../../services/file.service";
import { asyncHandler } from "../../utils/asyncHandler";

const ContextMenu = ({ targetItem, onRefresh = () => {} }) => {
  const navigate = useNavigate();
  const { setPopUp } = useOutletContext();

  const updateHandler = asyncHandler(
    async ({ type, id, payload, callbackFn, message }) => {
      await callbackFn(id, payload);
      onRefresh();
      toast.success(message || `${type} updated successfully!`);
    },
    {
      onError: (error) => {
        console.error("Error in updateHandler:", error);
        toast.error("An unexpected error occurred.");
      },
    },
  );

  const openFileHandler = asyncHandler(
    async (fileId) => {
      const { data: fileData } = await getFile(fileId);
      window.open(fileData.url, "_blank");
    },
    {
      onError: (error) => {
        console.error("Error in openFileHandler:", error);
        toast.error("An unexpected error occurred.");
      },
    },
  );

  return (
    <>
      <button
        onClick={() =>
          targetItem.type === "folder"
            ? navigate(`../folder/${targetItem?.id}`)
            : openFileHandler(targetItem?.id)
        }
        className="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-900"
        title={`Open ${targetItem?.type}`}
      >
        {targetItem?.type === "folder" ? (
          <MdFolderOpen className="text-xl" />
        ) : (
          <MdOpenInNew className="text-lg" />
        )}

        <span>Open</span>
      </button>

      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-900"
        title={`Rename ${targetItem?.type}`}
        onClick={() => {
          setPopUp({
            actionType:
              targetItem.type === "folder" ? "rename_folder" : "rename_file",
            title: `Rename ${targetItem?.type}`,
            subText: `${targetItem?.type} Name`,
            placeholder: `Enter ${targetItem?.type} name`,
            data: {
              name: targetItem.name,
              [`${targetItem.type}Id`]: targetItem.id,
            },
          });
        }}
      >
        <MdEdit className="text-xl" />
        <span>Rename</span>
      </button>

      {targetItem?.isStarred ? (
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-900"
          title="Remove from Starred"
          onClick={() =>
            updateHandler({
              type: targetItem.type,
              id: targetItem.id,
              payload: {
                isStarred: false,
              },
              callbackFn:
                targetItem.type === "folder" ? updateFolder : updateFile,
              message: `${targetItem.type} removed from starred!`,
            })
          }
        >
          <MdStar className="text-xl text-yellow-400" />
          <span>Remove from Starred</span>
        </button>
      ) : (
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-900"
          title="Add to Starred"
          onClick={() =>
            updateHandler({
              type: targetItem.type,
              id: targetItem.id,
              payload: {
                isStarred: true,
              },
              callbackFn:
                targetItem.type === "folder" ? updateFolder : updateFile,
              message: `${targetItem.type} added to starred!`,
            })
          }
        >
          <MdStarOutline className="text-xl" />
          <span>Add to Starred</span>
        </button>
      )}

      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-900"
        title={`Move ${targetItem?.type} to trash`}
        onClick={() =>
          updateHandler({
            type: targetItem.type,
            id: targetItem.id,
            payload: {
              isTrashed: true,
            },
            callbackFn:
              targetItem.type === "folder" ? updateFolder : updateFile,
            message: `${targetItem.type} moved to trash!`,
          })
        }
      >
        <MdDelete className="text-xl" />
        <span>Remove</span>
      </button>
    </>
  );
};
export default ContextMenu;
