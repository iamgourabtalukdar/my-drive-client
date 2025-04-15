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
  const { addFolder, addFiles } = useFolder();

  const onRestoreItem = async (type, itemId, newName) => {
    await restoreItem(type, itemId, newName);
    await loadTrash();
  };
  const onDeleteItem = async (type, id) => {
    await deleteItem(type, id);
    await loadTrash();
  };
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
      <DriveLayout onAddFolder={addFolder} onAddFiles={addFiles}>
        <TrashViewTable
          files={files}
          folders={folders}
          onRestoreItem={onRestoreItem}
          onDeleteItem={onDeleteItem}
        />
      </DriveLayout>
    </DriveProvider>
  );
};

export default Trash;
