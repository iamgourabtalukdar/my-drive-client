import { createContext } from "react";

import { useDriveData } from "../hooks/useDriveData";

export const DriveContext = createContext();

export function DriveProvider({ children }) {
  const driveData = useDriveData();
  return (
    <DriveContext.Provider value={driveData}>{children}</DriveContext.Provider>
  );
}
