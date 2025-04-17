// components/DriveLayout.js

import { useContext, useState } from "react";
import FileUpload from "./FileUpload";
import Header from "./Header";
import FileFolderCreateRenameModel from "./modelPopUp/FileFolderCreateRenameModel";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import { DriveContext } from "../contexts/DriveContext";

const DriveLayout = ({
  children,
  onAddFolder,
  onAddFiles,
  onRenameItem,
  onRefresh,
}) => {
  const [isFileUpload, setIsFileUpload] = useState(false);
  const { fileFolderModel, setFileFolderModel, isListView, setIsListView } =
    useContext(DriveContext);

  return (
    <>
      <div className="bg-white font-sans text-gray-800 max-h-screen min-h-screen overflow-hidden flex flex-col">
        <Header />
        <div className="flex ">
          <Sidebar
            onUploadClick={() => setIsFileUpload(true)}
            setFileFolderModel={setFileFolderModel}
          />
          <main className="w-full p-4">
            <Toolbar
              onRefresh={onRefresh}
              isListView={isListView}
              setIsListView={setIsListView}
            />
            {children}
          </main>
        </div>
      </div>

      {/* Modals */}
      {isFileUpload && (
        <FileUpload
          onAddFiles={onAddFiles}
          onClose={() => setIsFileUpload(false)}
        />
      )}

      {fileFolderModel.isVisible && (
        <FileFolderCreateRenameModel
          fileFolderModel={fileFolderModel}
          setFileFolderModel={setFileFolderModel}
          onAddFolder={onAddFolder}
          onRenameItem={onRenameItem}
        />
      )}
    </>
  );
};

export default DriveLayout;
