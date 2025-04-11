// components/DriveLayout.js

import { useContext, useState } from "react";
import FileUpload from "./FileUpload";
import Header from "./Header";
import FileFolderCreateRenameModel from "./modelPopUp/FileFolderCreateRenameModel";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import { DriveContext } from "../contexts/DriveContext";

const DriveLayout = ({ children }) => {
  const [showFileUpload, setShowFileUpload] = useState(false);
  const { fileFolderModel, setFileFolderModel } = useContext(DriveContext);

  return (
    <>
      <div className="bg-white font-sans text-gray-800 h-screen flex flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            onUploadClick={() => setShowFileUpload(true)}
            setFileFolderModel={setFileFolderModel}
          />
          <main className="flex-1 overflow-auto p-4">
            <Toolbar onUploadClick={() => setShowFileUpload(true)} />
            {children}
          </main>
        </div>
      </div>

      {/* Modals */}
      {showFileUpload && (
        <FileUpload onClose={() => setShowFileUpload(false)} />
      )}

      {fileFolderModel.isVisible && (
        <FileFolderCreateRenameModel fileFolderModel={fileFolderModel} />
      )}
    </>
  );
};

export default DriveLayout;
