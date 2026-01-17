import { FaRegFolderOpen } from "react-icons/fa";
import ContextMenuWrapper from "../components/contextMenu/ContextMenuWrapper";
import useContextMenu from "../hooks/useContextMenu";
import { useContext, useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { toast } from "react-toastify";
import GridView from "../components/GridView";
import ListView from "../components/ListView";
import { DriveContext } from "../contexts/DriveContext";
import ContextMenu from "../components/contextMenu/ContextMenu";
import { getFile } from "../services/file.service";
import { getFolderContents } from "../services/folder.service";

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

  const getFolderContentsHandler = async () => {
    try {
      const response = await getFolderContents(folderId);
      setFolderContents({
        folders: response.data.folders,
        files: response.data.files,
      });
    } catch (error) {
      console.error("Error fetching folder contents:", error);
      toast.error("Failed to load folder contents.");
    }
  };

  const openFileHandler = async (fileId) => {
    try {
      const { data: fileData } = await getFile(fileId);
      window.open(fileData.url, "_blank");
    } catch (error) {
      console.error("Error fetching file URL:", error);
      toast.error("Failed to load file URL.");
    }
  };

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
