import { useContext, useEffect, useState } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import { useOutletContext } from "react-router";
import toast from "react-hot-toast";
import ContextMenu from "../components/contextMenu/ContextMenu";
import ContextMenuWrapper from "../components/contextMenu/ContextMenuWrapper";
import GridView from "../components/GridView";
import ListView from "../components/ListView";
import { DriveContext } from "../contexts/DriveContext";
import useContextMenu from "../hooks/useContextMenu";
import { getFile } from "../services/file.service";
import { getStarredContents } from "../services/starred.service";
import { asyncHandler } from "../utils/asyncHandler";

const Starred = () => {
  const { isListView } = useContext(DriveContext);
  const { refreshKey } = useOutletContext();
  const [starredContents, setStarredContents] = useState({
    folders: [],
    files: [],
  });

  const {
    menuPosition,
    target: targetItem,
    handleContextMenu,
    hideContextMenu,
  } = useContextMenu({});

  const openFileHandler = asyncHandler(
    async (fileId) => {
      const { data: fileData } = await getFile(fileId);
      window.open(fileData.url, "_blank");
    },
    {
      onError: (error) => {
        console.error("Error while opening file:", error);
        toast.error("Failed to open file.");
      },
    },
  );

  const getStarredContentsHandler = asyncHandler(
    async () => {
      const { data } = await getStarredContents();
      setStarredContents({
        folders: data.folders,
        files: data.files,
      });
    },
    {
      onError: (error) => {
        console.error("Error in getStarredContentsHandler:", error);
        toast.error("An unexpected error occurred.");
      },
    },
  );

  useEffect(() => {
    getStarredContentsHandler();
  }, [refreshKey]);

  return (
    <>
      {/* Folder context menu start  */}
      <ContextMenuWrapper
        menuPosition={menuPosition}
        targetId={targetItem?.id}
        onClose={hideContextMenu}
      >
        <ContextMenu
          targetItem={targetItem}
          onRefresh={getStarredContentsHandler}
        />
      </ContextMenuWrapper>
      {/* Folder context menu end  */}

      {starredContents.folders.length || starredContents.files.length ? (
        isListView === "yes" ? (
          <ListView
            folders={starredContents.folders}
            files={starredContents.files}
            openFileHandler={openFileHandler}
            handleContextMenu={handleContextMenu}
          />
        ) : (
          <GridView
            folders={starredContents.folders}
            files={starredContents.files}
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

export default Starred;
