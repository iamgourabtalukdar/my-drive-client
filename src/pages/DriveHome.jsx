import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegFolderOpen } from "react-icons/fa";
import { useOutletContext, useParams } from "react-router";
import ContextMenu from "../components/contextMenu/ContextMenu";
import ContextMenuWrapper from "../components/contextMenu/ContextMenuWrapper";
import GridView from "../components/GridView";
import ListView from "../components/ListView";
import { DriveContext } from "../contexts/DriveContext";
import useContextMenu from "../hooks/useContextMenu";
import { getFile } from "../services/file.service";
import { getFolderContents } from "../services/folder.service";
import { asyncHandler } from "../utils/asyncHandler";

const DriveHome = () => {
  const { folderId } = useParams();
  const [folderContents, setFolderContents] = useState({
    folders: [],
    files: [],
  });
  const { isListView } = useContext(DriveContext);
  const { refreshKey, setCurrentFolderId } = useOutletContext();

  const onRefresh = () => {
    getFolderContentsHandler(folderId);
  };
  const {
    menuPosition,
    target: targetItem,
    handleContextMenu,
    hideContextMenu,
  } = useContextMenu({});

  const getFolderContentsHandler = asyncHandler(
    async () => {
      const response = await getFolderContents(folderId);
      setFolderContents({
        folders: response.data.folders,
        files: response.data.files,
      });
    },
    {
      onError: () => {
        toast.error("Failed to load Folder");
      },
    },
  );

  const openFileHandler = asyncHandler(
    async (fileId) => {
      const { data: fileData } = await getFile(fileId);
      window.open(fileData.url, "_blank");
    },
    {
      onError: () => {
        toast.error("Failed to open file");
      },
    },
  );

  useEffect(() => {
    setCurrentFolderId(folderId || null);
  }, [folderId]);

  useEffect(() => {
    getFolderContentsHandler();
  }, [folderId, refreshKey]);

  return (
    <>
      {/* Folder context menu start  */}
      <ContextMenuWrapper
        menuPosition={menuPosition}
        targetId={targetItem?.id}
        onClose={hideContextMenu}
      >
        <ContextMenu targetItem={targetItem} onRefresh={onRefresh} />
      </ContextMenuWrapper>
      {/* Folder context menu end  */}

      {folderContents.folders.length || folderContents.files.length ? (
        isListView === "yes" ? (
          <ListView
            folders={folderContents.folders}
            files={folderContents.files}
            openFileHandler={openFileHandler}
            handleContextMenu={handleContextMenu}
          />
        ) : (
          <GridView
            folders={folderContents.folders}
            files={folderContents.files}
            openFileHandler={openFileHandler}
            handleContextMenu={handleContextMenu}
          />
        )
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
          <FaRegFolderOpen className="text-7xl lg:text-9xl" />
          <h1 className="text-2xl font-medium">Folder is empty</h1>
        </div>
      )}
    </>
  );
};

export default DriveHome;
