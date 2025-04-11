import { useEffect } from "react";
import { Link } from "react-router";

const FileFolderContextMenu = ({
  contextMenu,
  setContextMenu,
  setFileFolderModel,
  handleMoveToTrash,
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
            <span className="material-icons text-gray-600 mr-2 text-sm">
              open_in_new
            </span>
            <span>Open</span>
          </Link>
          <Link
            to={`${import.meta.env.VITE_API_BASE_URL}/file/${
              contextMenu.item.id
            }?action=download`}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
          >
            <span className="material-icons text-gray-600 mr-2 text-sm">
              download
            </span>
            <span>Download</span>
          </Link>
        </>
      ) : (
        <>
          <Link
            to={`/drive/folder/${contextMenu.item.id}`}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
          >
            <span className="material-icons text-gray-600 mr-2 text-sm">
              folder_open
            </span>
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
        <span className="material-icons text-gray-600 mr-2 text-sm">edit</span>
        <span>Rename</span>
      </button>
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
        <span className="material-icons text-gray-600 mr-2 text-sm">share</span>
        <span>Share</span>
      </div>
      <div className="border-t border-gray-200 my-1"></div>
      <button
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center w-full"
        onClick={() => handleMoveToTrash(contextMenu.type, contextMenu.item.id)}
      >
        <span className="material-icons text-gray-600 mr-2 text-sm">
          delete
        </span>
        <span>Remove</span>
      </button>
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
        <span className="material-icons text-gray-600 mr-2 text-sm">info</span>
        <span>Details</span>
      </div>
    </div>
  );
};

export default FileFolderContextMenu;
