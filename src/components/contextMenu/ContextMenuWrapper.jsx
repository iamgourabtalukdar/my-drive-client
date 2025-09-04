// components/common/ContextMenuWrapper.jsx
import React, { useRef, useEffect } from "react";

const ContextMenuWrapper = ({ menuPosition, targetId, onClose, children }) => {
  const menuRef = useRef(null);

  // Effect to close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (menuPosition) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("wheel", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("wheel", handleClickOutside);
    };
  }, [menuPosition, onClose]);

  if (!menuPosition || menuPosition.x === null || menuPosition.y === null) {
    return null; // Don't render if menu is not active
  }

  return (
    <div
      ref={menuRef}
      className="text-color absolute z-[500] min-w-40 rounded-md bg-gray-50 p-1 shadow-sm shadow-black/10 dark:bg-gray-800 dark:shadow-white/10"
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
