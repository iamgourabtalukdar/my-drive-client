import { useContext, useEffect, useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import { useOutletContext } from "react-router";
import toast from "react-hot-toast";
import ContextMenuWrapper from "../components/contextMenu/ContextMenuWrapper";
import TrashContextMenu from "../components/contextMenu/TrashContextMenu";
import GridView from "../components/GridView";
import ListView from "../components/ListView";
import { DriveContext } from "../contexts/DriveContext";
import useContextMenu from "../hooks/useContextMenu";
import { getTrashContents } from "../services/trash.service";

const Trash = () => {
  const { refreshKey } = useOutletContext();

  const { isListView } = useContext(DriveContext);
  const [trashContents, setTrashContents] = useState({
    folders: [],
    files: [],
  });

  const {
    menuPosition,
    target: targetItem,
    handleContextMenu,
    hideContextMenu,
  } = useContextMenu({});

  const onRefresh = () => {
    getTrashContentsHandler();
  };

  const getTrashContentsHandler = async () => {
    try {
      const { data } = await getTrashContents();
      setTrashContents({
        folders: data.folders,
        files: data.files,
      });
    } catch (error) {
      console.error("Error fetching trash contents:", error);
      toast.error("Failed to load trash contents.");
    }
  };

  useEffect(() => {
    getTrashContentsHandler();
  }, [refreshKey]);

  return (
    <>
      {/* Folder context menu start  */}
      <ContextMenuWrapper
        menuPosition={menuPosition}
        targetId={targetItem?.id}
        onClose={hideContextMenu}
      >
        <TrashContextMenu targetItem={targetItem} onRefresh={onRefresh} />
      </ContextMenuWrapper>
      {/* Folder context menu end  */}

      {trashContents.folders.length || trashContents.files.length ? (
        isListView === "yes" ? (
          <ListView
            folders={trashContents.folders}
            files={trashContents.files}
            isTrash={true}
            handleContextMenu={handleContextMenu}
          />
        ) : (
          <GridView
            folders={trashContents.folders}
            files={trashContents.files}
            isTrash={true}
            handleContextMenu={handleContextMenu}
          />
        )
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
          <FaRegFolderOpen className="text-7xl lg:text-9xl" />
          <h1 className="text-2xl font-medium">Your trash is empty</h1>
        </div>
      )}
    </>
  );
};

export default Trash;
