import { useEffect } from "react";
import {
  MdDelete,
  MdDeleteForever,
  MdDownload,
  MdEdit,
  MdFolderOpen,
  MdInfoOutline,
  MdOpenInNew,
  MdOutlineShare,
  MdRestore,
} from "react-icons/md";
import { Link } from "react-router";

const FileFolderContextMenu = ({
  isTrashedContext = false,
  contextMenu,
  setContextMenu,
  setFileFolderModel,
  handleMoveToTrash,
  handleRestoreFromTrash,
  handleDeleteFromTrash,
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

  // if trash page
  if (isTrashedContext)
    return (
      <div
        className="context-menu bg-white shadow-lg rounded-md py-1 w-48 border border-gray-200"
        style={{
          position: "fixed",
          left: `${contextMenu.x}px`,
          top: `${contextMenu.y}px`,
          zIndex: 1000,
        }}
        // onClick={(e) => e.stopPropagation()}
      >
        <button
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center w-full"
          onClick={() =>
            handleRestoreFromTrash(contextMenu.type, contextMenu.item.id)
          }
        >
          <MdRestore className=" text-gray-600 mr-2 text-2xl" />
          <span>Restore</span>
        </button>
        <button
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center w-full"
          onClick={() => {
            handleDeleteFromTrash(contextMenu.type, contextMenu.item.id);
          }}
        >
          <MdDeleteForever className=" text-gray-600 mr-2 text-2xl" />
          <span>Delete Forever</span>
        </button>
      </div>
    );

  //if drive page
  return (
    <div
      className="context-menu bg-white shadow-lg rounded-md py-1 w-48 border border-gray-200"
      style={{
        position: "fixed",
        left: `${contextMenu.x}px`,
        top: `${contextMenu.y}px`,
        zIndex: 1000,
      }}
      // onClick={(e) => e.stopPropagation()}
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
        onClick={() => handleMoveToTrash(contextMenu.type, contextMenu.item.id)}
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

export default FileFolderContextMenu;
