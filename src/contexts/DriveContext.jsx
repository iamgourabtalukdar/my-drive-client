import { createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
export const DriveContext = createContext();

export function DriveProvider({ children }) {
  const [contextMenu, setContextMenu] = useState({
    visible: "",
    x: 0,
    y: 0,
    item: null,
    type: "",
  });
  const [fileFolderModel, setFileFolderModel] = useState({ isVisible: false });
  const [isListView, setIsListView] = useState(true);

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
      <ToastContainer />
    </DriveContext.Provider>
  );
}
