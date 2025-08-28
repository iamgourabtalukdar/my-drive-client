import { useCallback, useState } from "react";

const useContextMenu = (targetValue) => {
  const [menuPosition, setMenuPosition] = useState(null);
  const [target, setTarget] = useState(targetValue || null);

  const handleContextMenu = useCallback((e, data) => {
    e.preventDefault();
    setMenuPosition({ x: e.clientX + 2, y: e.clientY + 2 });
    setTarget(data);
  }, []);

  const hideContextMenu = useCallback(() => {
    setMenuPosition(null);
    setTarget(targetValue || null);
  }, []);

  return { menuPosition, target, handleContextMenu, hideContextMenu };
};
export default useContextMenu;
