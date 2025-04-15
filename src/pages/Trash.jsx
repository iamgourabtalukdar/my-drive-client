import { useEffect } from "react";
import DriveLayout from "../components/DriveLayout";
import TrashViewTable from "../components/TrashViewTable";
import { DriveProvider } from "../contexts/DriveContext";
import useTrash from "../hooks/useTrash";
import useFolder from "../hooks/useFolder";
import SpinLoader from "../components/SpinLoader";

const Trash = () => {
  const { files, folders, loading, error, loadTrash, restoreItem, deleteItem } =
    useTrash();
  const { addFolder, renameItem, addFiles } = useFolder();

  useEffect(() => {
    loadTrash();
  }, []);

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
        <TrashViewTable
          files={files}
          folders={folders}
          onRestoreItem={restoreItem}
          onDeleteItem={deleteItem}
        />
      </DriveLayout>
    </DriveProvider>
  );
};

export default Trash;
