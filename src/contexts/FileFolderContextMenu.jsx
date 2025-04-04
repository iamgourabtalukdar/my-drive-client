import { useEffect } from "react";

const FileFolderContextMenu = ({ contextMenu, setContextMenu }) => {
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
      onClick={(e) => e.stopPropagation()}
    >
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
        <span className="material-icons text-gray-600 mr-2 text-sm">
          open_in_new
        </span>
        <span>Open</span>
      </div>
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
        <span className="material-icons text-gray-600 mr-2 text-sm">
          download
        </span>
        <span>Download</span>
      </div>
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
        <span className="material-icons text-gray-600 mr-2 text-sm">share</span>
        <span>Share</span>
      </div>
      <div className="border-t border-gray-200 my-1"></div>
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
        <span className="material-icons text-gray-600 mr-2 text-sm">
          delete
        </span>
        <span>Remove</span>
      </div>
      <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
        <span className="material-icons text-gray-600 mr-2 text-sm">info</span>
        <span>Details</span>
      </div>
    </div>
  );
};

export default FileFolderContextMenu;
