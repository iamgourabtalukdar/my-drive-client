// components/common/ContextMenuWrapper.jsx
import { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const ContextMenuWrapper = ({ menuPosition, onClose, children }) => {
  const menuRef = useRef(null);

  // Effect to close menu when clicking outside
  useOnClickOutside(menuRef, onClose);

  if (!menuPosition || menuPosition.x === null || menuPosition.y === null) {
    return null; // Don't render if menu is not active
  }

  return (
    <div
      ref={menuRef}
      className="text-color absolute z-[500] min-w-40 rounded-md bg-white p-1 shadow-sm dark:bg-gray-950 dark:shadow-gray-700"
      style={{ left: menuPosition.x, top: menuPosition.y }}
      onClick={onClose}
    >
      <ul className="text-sm">
        {/* Render the children (the actual menu items) here */}
        {children}
      </ul>
    </div>
  );
};

export default ContextMenuWrapper;
