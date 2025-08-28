import { FaRegFolderOpen, FaUser } from "react-icons/fa";
import useApi from "../hooks/useApi";
import driveService from "../services/driveService";
import useContextMenu from "../hooks/useContextMenu";
import ContextMenuWrapper from "../components/contextMenu/ContextMenuWrapper";

import { useContext, useEffect, useState } from "react";
import { DriveContext } from "../contexts/DriveContext";
import {
  MdDelete,
  MdDownload,
  MdEdit,
  MdFolderOpen,
  MdOpenInNew,
  MdOutlineShare,
  MdStar,
  MdStarOutline,
} from "react-icons/md";
import CreatePopUp from "../components/modelPopUp/CreatePopUp";
import { Link, useOutletContext, useParams } from "react-router";
import ListView from "../components/ListView";
import GridView from "../components/GridView";

const Home = () => {
  const { folderId = "" } = useParams();
  const { isListView } = useContext(DriveContext);
  // Get the refreshKey from the parent layout
  const { refreshKey, setCurrentFolderId } = useOutletContext();
  const {
    data: { folders = [], files = [] },
    execute: getFolderContents,
  } = useApi(driveService.getFolderContents, {});

  // API hooks for actions
  const { execute: deleteFolderApi } = useApi(driveService.deleteFolder);
  const { execute: starItemApi } = useApi(driveService.starItem);

  const [isCreatePopUp, setIsCreatePopUp] = useState(false);
  const [popUpData, setPopUpData] = useState(null);

  // This function can be simplified as it's only for local actions now
  const onRefresh = () => {
    getFolderContents(folderId);
  };
  const {
    menuPosition: folderMenuPosition,
    target: targetedFolder,
    handleContextMenu: handleFolderContextMenu,
    hideContextMenu: hideFolderContextMenu,
  } = useContextMenu({});
  const {
    menuPosition: fileMenuPosition,
    target: targetedFile,
    handleContextMenu: handleFileContextMenu,
    hideContextMenu: hideFileContextMenu,
  } = useContextMenu({});

  // Handler for renaming a folder
  const handleRenameFolder = (folder) => {
    hideFolderContextMenu();
    setPopUpData({ action: "rename", type: "folder", item: folder });
    setIsCreatePopUp(true);
  };

  // Handler for deleting a folder
  const handleDeleteFolder = async (folder) => {
    hideFolderContextMenu();
    // You might want to add a confirmation modal here
    await deleteFolderApi(folder.id);
    onRefresh(); // Refresh the list
  };

  // Handler for starring/unstarring an item
  const onStarredItem = async (itemId, isStarred) => {
    hideFolderContextMenu();
    hideFileContextMenu();
    await starItemApi(itemId, { isStarred });
    onRefresh(); // Refresh the list
  };

  // inform the parent layout of the current folder ID
  useEffect(() => {
    setCurrentFolderId(folderId);
  }, [folderId, setCurrentFolderId]);

  useEffect(() => {
    getFolderContents(folderId);
  }, [folderId, getFolderContents, refreshKey]);

  return (
    <>
      {/* Folder context menu start  */}
      <ContextMenuWrapper
        menuPosition={folderMenuPosition}
        targetId={targetedFolder?.id}
        onClose={hideFolderContextMenu}
      >
        <Link
          to={folderId ? `../${targetedFolder?.id}` : `./${targetedFolder?.id}`}
          className="flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-hover focus:bg-hover"
          title="Open Folder"
        >
          <MdFolderOpen className="text-xl" />
          <span>Open</span>
        </Link>

        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-hover focus:bg-hover"
          title="Rename Folder"
          onClick={() => handleRenameFolder(targetedFolder)}
        >
          <MdEdit className="text-xl" />
          <span>Rename</span>
        </button>
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-hover focus:bg-hover"
          title="Share Folder"
          // onClick={() => handleShareFolder(targetedFolder)} // TODO: Implement Share functionality
        >
          <MdOutlineShare className="text-xl" />
          <span>Share</span>
        </button>

        {targetedFolder?.starred ? (
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-hover focus:bg-hover"
            title="Remove from Starred"
            onClick={() => onStarredItem(targetedFolder.id, false)}
          >
            <MdStar className="text-xl" />
            <span>Remove from Starred</span>
          </button>
        ) : (
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-hover focus:bg-hover"
            title="Add to Starred"
            onClick={() => onStarredItem(targetedFolder.id, true)}
          >
            <MdStarOutline className="text-xl" />
            <span>Add to Starred</span>
          </button>
        )}

        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-hover focus:bg-hover"
          title="Delete Folder"
          onClick={() => handleDeleteFolder(targetedFolder)}
        >
          <MdDelete className="text-xl" />
          <span>Delete</span>
        </button>
      </ContextMenuWrapper>
      {/* Folder context menu end  */}

      {/* File context menu start  */}
      <ContextMenuWrapper
        menuPosition={fileMenuPosition}
        targetId={targetedFile?.id}
        onClose={hideFileContextMenu}
      >
        <Link
          to={`./${targetedFile}`} // This path might need adjustment based on your routing
          className="flex cursor-pointer items-baseline gap-2 rounded-md px-4 py-2 hover:bg-hover focus:bg-hover"
          title="Visit Profile"
        >
          <FaUser />
          <span>Visit Profile</span>
        </Link>
        <Link
          to={`${import.meta.env.VITE_API_BASE_URL}/file/${targetedFile?.id}`}
          target="_blank"
          className="flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-hover focus:bg-hover"
          title="Open file in new tab"
        >
          <MdOpenInNew className="text-lg" />
          <span>Open</span>
        </Link>
        <Link
          to={`${import.meta.env.VITE_API_BASE_URL}/file/${targetedFile?.id}?action=download`}
          target="_blank"
          className="flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 hover:bg-hover focus:bg-hover"
          title="Download file"
        >
          <MdDownload className="text-lg" />
          <span>Download</span>
        </Link>
      </ContextMenuWrapper>
      {/* File context menu end  */}

      {folders.length || files.length ? (
        isListView === "yes" ? (
          <ListView
            folders={folders}
            files={files}
            handleFolderContextMenu={handleFolderContextMenu}
            handleFileContextMenu={handleFileContextMenu}
          />
        ) : (
          <GridView
            folders={folders}
            files={files}
            onStarredItem={onStarredItem}
            handleFolderContextMenu={handleFolderContextMenu}
            handleFileContextMenu={handleFileContextMenu}
          />
        )
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center text-color/50">
          <FaRegFolderOpen className="text-7xl lg:text-9xl" />
          <h1 className="text-2xl font-medium">Folder is empty</h1>
        </div>
      )}

      {isCreatePopUp && (
        <CreatePopUp
          setIsCreatePopUp={setIsCreatePopUp}
          data={popUpData}
          onSuccess={onRefresh}
        />
      )}
    </>
  );
};

export default Home;
