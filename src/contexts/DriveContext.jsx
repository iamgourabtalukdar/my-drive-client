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
  const [isListView, setIsListView] = useState(false);

  return (
    <DriveContext.Provider
      value={{
        contextMenu,
        setContextMenu,
        fileFolderModel,
        setFileFolderModel,
        isListView,
        setIsListView,
      }}
    >
      {children}
    </DriveContext.Provider>
  );
}
