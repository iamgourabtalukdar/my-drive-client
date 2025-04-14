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
} from "react-icons/md";

const DriveContextMenu = ({
  contextMenu,
  setContextMenu,
  setFileFolderModel,
  onTrashItem,
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
      className="context-menu bg-white shadow-lg rounded-md py-1 w-48 border border-gray-200"
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
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
          >
            <MdOpenInNew className=" text-gray-600 mr-2 text-2xl" />
            <span>Open</span>
          </Link>
          <Link
            to={`${import.meta.env.VITE_API_BASE_URL}/file/${
              contextMenu.item.id
            }?action=download`}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
          >
            <MdDownload className=" text-gray-600 mr-2 text-2xl" />
            <span>Download</span>
          </Link>
        </>
      ) : (
        <>
          <Link
            to={`/drive/folder/${contextMenu.item.id}`}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
          >
            <MdFolderOpen className=" text-gray-600 mr-2 text-2xl" />
            <span>Open</span>
          </Link>
        </>
      )}

      <button
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center w-full"
        onClick={() =>
          setFileFolderModel({
            isVisible: true,
            action: "rename",
            type: contextMenu.type,
            item: contextMenu.item,
          })
        }
      >
        <MdEdit className=" text-gray-600 mr-2 text-2xl" />
        <span>Rename</span>
      </button>
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
        <MdOutlineShare className=" text-gray-600 mr-2 text-2xl" />
        <span>Share</span>
      </div>
      <div className="border-t border-gray-200 my-1"></div>
      <button
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center w-full"
        onClick={() => onTrashItem(contextMenu.type, contextMenu.item.id)}
      >
        <MdDelete className=" text-gray-600 mr-2 text-2xl" />

        <span>Remove</span>
      </button>
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
        <MdInfoOutline className=" text-gray-600 mr-2 text-2xl" />
        <span>Details</span>
      </div>
    </div>
  );
};
export default DriveContextMenu;
