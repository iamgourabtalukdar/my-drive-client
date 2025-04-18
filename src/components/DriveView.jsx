import { DriveContext } from "../contexts/DriveContext";
import { useContext } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import DriveContextMenu from "./contextMenu/DriveContextMenu";
import GridView from "./GridView";
import ListView from "./ListView";

const DriveView = ({ folders, files, onTrashItem, onStarredItem }) => {
  const { isListView, setFileFolderModel, contextMenu, setContextMenu } =
    useContext(DriveContext);

  // console.log(isListView);

  return (
    <>
      {contextMenu.visible && (
        <DriveContextMenu
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          setFileFolderModel={setFileFolderModel}
          onTrashItem={onTrashItem}
          onStarredItem={onStarredItem}
        />
      )}

      {folders.length || files.length ? (
        isListView ? (
          <ListView folders={folders} files={files} />
        ) : (
          <GridView
            folders={folders}
            files={files}
            onStarredItem={onStarredItem}
          />
        )
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center">
          <FaRegFolderOpen className="text-9xl text-gray-100" />
          <h1 className="mt-4 text-2xl font-medium text-gray-200">
            Folder is empty
          </h1>
        </div>
      )}
    </>
  );
};

export default DriveView;
