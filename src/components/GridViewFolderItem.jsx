import {
  BsFolderFill,
  BsStar,
  BsStarFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { useNavigate } from "react-router";

const GridViewFolderItem = ({
  folder,
  handleFolderContextMenu,
  onStarredItem,
  isTrash,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex cursor-default items-center justify-between gap-2 rounded-md border border-gray-700/20 px-4 py-3 hover:bg-gray-50 dark:border-gray-200/20 dark:bg-gray-900 dark:hover:bg-gray-800"
      onDoubleClick={
        isTrash ? () => {} : () => navigate(`/drive/folder/${folder.id}`)
      }
      onContextMenu={(e) =>
        handleFolderContextMenu(e, { type: "folder", ...folder })
      }
    >
      <div className="flex min-w-0 items-center">
        <BsFolderFill className="mr-2 min-w-5 text-xl" />
        <span className="max-w-[90%] min-w-0 truncate text-sm font-medium">
          {folder.name}
        </span>
      </div>
      <div className="ml-2 flex items-center gap-2">
        {folder.starred ? (
          <button
            className="transform text-yellow-400 duration-100 hover:scale-[1.4]"
            title="Remove from starred"
            onClick={() => onStarredItem("folder", folder.id, false)}
          >
            <BsStarFill />
          </button>
        ) : (
          <button
            className="transform transition duration-100 hover:scale-[1.3]"
            title="Add to starred"
            onClick={() => onStarredItem("folder", folder.id, true)}
          >
            <BsStar />
          </button>
        )}
        <button
          onClick={(e) => handleFolderContextMenu(e, folder)}
          className="rounded-full p-1 transition duration-100 hover:bg-gray-100 dark:hover:bg-gray-900"
        >
          <BsThreeDotsVertical />
        </button>
      </div>
    </div>
  );
};
export default GridViewFolderItem;
