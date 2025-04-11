import { DriveProvider } from "../contexts/DriveContext";
import DriveLayout from "./DriveLayout";

const DriveLayoutContainer = ({ children }) => {
  return (
    <DriveProvider>
      <DriveLayout>{children}</DriveLayout>
    </DriveProvider>
  );
};
export default DriveLayoutContainer;
