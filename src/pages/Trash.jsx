import { useContext, useEffect } from "react";
import { useOutletContext } from "react-router";
import useApi from "../hooks/useApi";
import {
  deleteItemForever,
  getTrashContents,
  restoreItem,
} from "../services/driveService";
import { DriveContext } from "../contexts/DriveContext";
import useContextMenu from "../hooks/useContextMenu";
import ContextMenuWrapper from "../components/contextMenu/ContextMenuWrapper";
import { MdDeleteForever, MdOutlineRestore } from "react-icons/md";
import { FaRegFolderOpen } from "react-icons/fa";
import ListView from "../components/ListView";
import GridView from "../components/GridView";

const Trash = () => {
  const { refreshKey } = useOutletContext();
  const { isListView } = useContext(DriveContext);
  const {
    data: { folders = [], files = [] },
    execute: getTrashContentsHandler,
  } = useApi(getTrashContents, {});

  const { execute: restoreItemHandler } = useApi(restoreItem);
  const { execute: deleteItemForeverHandler } = useApi(deleteItemForever);

  const {
    menuPosition,
    target: targetItem,
    handleContextMenu: handleContextMenu,
    hideContextMenu: hideContextMenu,
  } = useContextMenu({});

  const onRefresh = () => {
    getTrashContentsHandler();
  };

  const handlerestoreItemHandler = async (item) => {
    hideContextMenu();
    await restoreItemHandler(item.type, item.id);
    onRefresh();
  };
  const handleDeleteForever = async (item) => {
    hideContextMenu();
    await deleteItemForeverHandler(item.type, item.id);
    onRefresh();
  };

  useEffect(() => {
    getTrashContentsHandler();
  }, [getTrashContentsHandler, refreshKey]);

  return (
    <>
      {/* Folder context menu start  */}
      <ContextMenuWrapper
        menuPosition={menuPosition}
        targetId={targetItem?.id}
        onClose={hideContextMenu}
      >
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-900"
          title="Restore"
          onClick={() => handlerestoreItemHandler(targetItem)}
        >
          <MdOutlineRestore className="text-xl" />
          <span>Restore</span>
        </button>
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-800 dark:focus:bg-gray-900"
          title="Delete Forever"
          onClick={() => handleDeleteForever(targetItem)}
        >
          <MdDeleteForever className="text-xl" />
          <span>Delete Forever</span>
        </button>
      </ContextMenuWrapper>
      {/* Folder context menu end  */}

      {folders.length || files.length ? (
        isListView === "yes" ? (
          <ListView
            folders={folders}
            files={files}
            isTrash={true}
            handleFolderContextMenu={handleContextMenu}
            handleFileContextMenu={handleContextMenu}
          />
        ) : (
          <GridView
            folders={folders}
            files={files}
            isTrash={true}
            handleFolderContextMenu={handleContextMenu}
            handleFileContextMenu={handleContextMenu}
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
