import { DriveContext } from "../contexts/DriveContext";
import { useContext } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import DriveContextMenu from "./contextMenu/DriveContextMenu";
import GridView from "./GridView";
import ListView from "./ListView";

const DriveViewTable = ({ folders, files, onTrashItem, onStarredItem }) => {
  const { isListView, setFileFolderModel, contextMenu, setContextMenu } =
    useContext(DriveContext);

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
          <GridView folders={folders} files={files} />
        )
      ) : (
        <div className="flex justify-center items-center flex-col  mt-16">
          <FaRegFolderOpen className="text-gray-100 text-9xl" />
          <h1 className="text-gray-200 font-medium text-2xl mt-4">
            Folder is empty
          </h1>
        </div>
      )}
    </>
  );
};

export default DriveViewTable;
