import { useContext, useState } from "react";
import FileUpload from "./FileUpload";
import Header from "./Header";
import FileFolderCreateRenameModel from "./modelPopUp/FileFolderCreateRenameModel";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import { DriveContext } from "../contexts/DriveContext";
import { Outlet } from "react-router";

const DriveLayout = () => {
  const [isFileUpload, setIsFileUpload] = useState(false);
  const { fileFolderModel, setFileFolderModel, isListView, setIsListView } =
    useContext(DriveContext);

  const [onAddFolder, setOnAddFolder] = useState(() => {});
  const [onAddFiles, setOnAddFiles] = useState(() => {});
  const [onRenameItem, setOnRenameItem] = useState(() => {});
  const [onRefresh, setOnRefresh] = useState(() => {});

  return (
    <>
      <div className="grid h-screen min-h-screen grid-cols-[256px_1fr] grid-rows-[64px_64px_1fr] overflow-hidden font-sans text-gray-800">
        <Header />

        <Sidebar
          onUploadClick={() => setIsFileUpload(true)}
          setFileFolderModel={setFileFolderModel}
        />
        <Toolbar
          onRefresh={onRefresh}
          isListView={isListView}
          setIsListView={setIsListView}
        />
        <main className="col-span-3 col-start-2 row-start-3 row-end-4 overflow-y-scroll p-4">
          <Outlet
            context={{
              setOnAddFiles,
              setOnAddFolder,
              setOnRefresh,
              setOnRenameItem,
            }}
          />
        </main>
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
