import { FaRegTrashAlt } from "react-icons/fa";
import TrashContextMenu from "./contextMenu/TrashContextMenu";
import TrashListView from "./TrashListView";
import GridView from "./GridView";

const TrashView = ({ files, folders, onRestoreItem, onDeleteItem }) => {
  const { isListView, contextMenu, setContextMenu } = {};

  return (
    <>
      {contextMenu.visible && (
        <TrashContextMenu
          contextMenu={contextMenu}
          setContextMenu={setContextMenu}
          onRestoreItem={onRestoreItem}
          onDeleteItem={onDeleteItem}
        />
      )}

      {folders.length || files.length ? (
        isListView ? (
          <TrashListView folders={folders} files={files} />
        ) : (
          <GridView folders={folders} files={files} isTrash={true} />
        )
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center">
          <FaRegTrashAlt className="text-9xl text-gray-100" />
          <h1 className="mt-4 text-2xl font-medium text-gray-200">
            Your trash is empty
          </h1>
        </div>
      )}
    </>
  );
};

export default TrashView;
