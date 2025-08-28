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
      className="absolute z-[500] min-w-40 rounded-md bg-color p-1 text-color shadow-color-sm dark:bg-sub-color"
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
