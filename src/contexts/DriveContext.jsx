import { createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const DriveContext = createContext();

export const DriveProvider = ({ children }) => {
  const [isListView, setIsListView] = useLocalStorage(
    "isListView",
    window.innerWidth < 768 ? "no" : "yes",
  );

  return (
    <DriveContext.Provider value={{ isListView, setIsListView }}>
      {children}
    </DriveContext.Provider>
  );
};
