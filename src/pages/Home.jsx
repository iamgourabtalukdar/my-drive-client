import { useEffect } from "react";
import DriveLayout from "../components/DriveLayout";
import DriveViewTable from "../components/DriveViewTable";
import { DriveProvider } from "../contexts/DriveContext";
import useFolder from "../hooks/useFolder";
import SpinLoader from "../components/SpinLoader";
import useStarred from "../hooks/useStarred";

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
  const { updateStarredItem } = useStarred();

  useEffect(() => {
    loadFolder();
  }, [folderId]);

  const onAddFolder = async (folderName) => {
    await addFolder(folderName);
    await loadFolder();
  };

  const onAddFiles = async (files) => {
    await addFiles(files);
    await loadFolder();
  };

  const onRenameItem = async (type, itemId, newName) => {
    await renameItem(type, itemId, newName);
    await loadFolder();
  };

  const onTrashItem = async (type, itemId) => {
    await trashItem(type, itemId);
    await loadFolder();
  };

  const onStarredItem = async (type, itemId, isStarred) => {
    await updateStarredItem(type, itemId, isStarred);
    await loadFolder();
  };

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
        onAddFolder={onAddFolder}
        onAddFiles={onAddFiles}
        onRenameItem={onRenameItem}
      >
        <DriveViewTable
          folders={folders}
          files={files}
          onTrashItem={onTrashItem}
          onStarredItem={onStarredItem}
        />
      </DriveLayout>
    </DriveProvider>
  );
};

export default Home;
