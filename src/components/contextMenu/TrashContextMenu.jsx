import { useEffect } from "react";
import { MdDeleteForever, MdRestore } from "react-icons/md";

const TrashContextMenu = ({
  contextMenu,
  setContextMenu,
  onRestoreItem,
  onDeleteItem,
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
      <button
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center w-full"
        onClick={() => onRestoreItem(contextMenu.type, contextMenu.item.id)}
      >
        <MdRestore className=" text-gray-600 mr-2 text-2xl" />
        <span>Restore</span>
      </button>
      <button
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center w-full"
        onClick={() => {
          onDeleteItem(contextMenu.type, contextMenu.item.id);
        }}
      >
        <MdDeleteForever className=" text-gray-600 mr-2 text-2xl" />
        <span>Delete Forever</span>
      </button>
    </div>
  );
};
export default TrashContextMenu;
