import { useEffect } from "react";
import DriveLayout from "../components/DriveLayout";
import DriveViewTable from "../components/DriveViewTable";
import { DriveProvider } from "../contexts/DriveContext";
import useFolder from "../hooks/useFolder";
import SpinLoader from "../components/SpinLoader";

const Home = () => {
  const {
    folderId,
    folders,
    files,
    loading,
    error,
    loadFolder,
    addFolder,
    renameItem,
    addFiles,
    trashItem,
  } = useFolder();

  useEffect(() => {
    loadFolder();
  }, [folderId]);

  // Handle loading state
  if (loading) {
    return (
      <DriveProvider>
        <DriveLayout>
          <SpinLoader classes="mt-16" />
        </DriveLayout>
      </DriveProvider>
    );
  }

  // Handle error state
  if (error) {
    return (
      <DriveProvider>
        <DriveLayout>
          <p>{error}</p>
        </DriveLayout>
      </DriveProvider>
    );
  }

  // Render table with folders and files
  return (
    <DriveProvider>
      <DriveLayout
        onAddFolder={addFolder}
        onAddFiles={addFiles}
        onRenameItem={renameItem}
      >
        <DriveViewTable
          folders={folders}
          files={files}
          onTrashItem={trashItem}
        />
      </DriveLayout>
    </DriveProvider>
  );
};

export default Home;
