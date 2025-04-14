import { createContext, useState } from "react";
export const DriveContext = createContext();

export function DriveProvider({ children }) {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    item: null,
    type: "",
  });
  const [fileFolderModel, setFileFolderModel] = useState({ isVisible: false });

  return (
    <DriveContext.Provider
      value={{
        contextMenu,
        setContextMenu,
        fileFolderModel,
        setFileFolderModel,
      }}
    >
      {children}
    </DriveContext.Provider>
  );
}
