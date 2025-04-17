import { useEffect } from "react";
import { Link } from "react-router";
import {
  MdDelete,
  MdDownload,
  MdEdit,
  MdFolderOpen,
  MdInfoOutline,
  MdOpenInNew,
  MdOutlineShare,
  MdStar,
  MdStarOutline,
} from "react-icons/md";

const DriveContextMenu = ({
  contextMenu,
  setContextMenu,
  setFileFolderModel,
  onTrashItem,
  onStarredItem,
}) => {
  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu.visible) {
        setContextMenu((prev) => ({ ...prev, visible: false }));
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (!contextMenu.visible) return null;

  return (
    <div
      className="context-menu min-w-60 rounded-md border border-gray-200 bg-white py-1 shadow-lg"
      style={{
        position: "fixed",
        left: `${contextMenu.x}px`,
        top: `${contextMenu.y}px`,
        zIndex: 1000,
      }}
      onClick={(e) => {
        e.stopPropagation();
        setContextMenu((prev) => ({ ...prev, visible: false }));
      }}
    >
      {contextMenu.type === "file" ? (
        <>
          <Link
            to={`${import.meta.env.VITE_API_BASE_URL}/file/${
              contextMenu.item.id
            }`}
            target="_blank"
            className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
          >
            <MdOpenInNew className="mr-2 text-2xl text-gray-600" />
            <span>Open</span>
          </Link>
          <Link
            to={`${import.meta.env.VITE_API_BASE_URL}/file/${
              contextMenu.item.id
            }?action=download`}
            className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
          >
            <MdDownload className="mr-2 text-2xl text-gray-600" />
            <span>Download</span>
          </Link>
        </>
      ) : (
        <>
          <Link
            to={`/drive/folder/${contextMenu.item.id}`}
            className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
          >
            <MdFolderOpen className="mr-2 text-2xl text-gray-600" />
            <span>Open</span>
          </Link>
        </>
      )}

      <button
        className="flex w-full cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
        onClick={() =>
          setFileFolderModel({
            isVisible: true,
            action: "rename",
            type: contextMenu.type,
            item: contextMenu.item,
          })
        }
      >
        <MdEdit className="mr-2 text-2xl text-gray-600" />
        <span>Rename</span>
      </button>
      <div className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100">
        <MdOutlineShare className="mr-2 text-2xl text-gray-600" />
        <span>Share</span>
      </div>

      <div className="my-1 border-t border-gray-200"></div>

      {contextMenu.item.starred ? (
        <button
          className="flex w-full cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
          onClick={() =>
            onStarredItem(contextMenu.type, contextMenu.item.id, false)
          }
        >
          <MdStar className="mr-2 text-2xl text-gray-600" />
          <span>Remove from Starred</span>
        </button>
      ) : (
        <button
          className="flex w-full cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
          onClick={() =>
            onStarredItem(contextMenu.type, contextMenu.item.id, true)
          }
        >
          <MdStarOutline className="mr-2 text-2xl text-gray-600" />
          <span>Add to Starred</span>
        </button>
      )}

      <div className="my-1 border-t border-gray-200"></div>

      <button
        className="flex w-full cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
        onClick={() => onTrashItem(contextMenu.type, contextMenu.item.id)}
      >
        <MdDelete className="mr-2 text-2xl text-gray-600" />

        <span>Remove</span>
      </button>
      <div className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100">
        <MdInfoOutline className="mr-2 text-2xl text-gray-600" />
        <span>Details</span>
      </div>
    </div>
  );
};
export default DriveContextMenu;
