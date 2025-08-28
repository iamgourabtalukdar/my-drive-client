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
      className={`flex cursor-default items-center justify-between gap-2 rounded-md border border-color/10 px-4 py-3 ${isTrash ? "border-red-100 bg-red-50 hover:bg-red-100" : "bg-sub-color hover:bg-hover"}`}
      onDoubleClick={
        isTrash ? () => {} : () => navigate(`/drive/folder/${folder.id}`)
      }
      onContextMenu={(e) => handleFolderContextMenu(e, folder)}
    >
      <div className="flex min-w-0 items-center">
        <BsFolderFill className="mr-2 min-w-5 text-xl" />
        <span className="min-w-0 max-w-[90%] truncate text-sm font-medium">
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
          className="rounded-full p-1 transition duration-100 hover:bg-[rgb(195,195,195)]"
        >
          <BsThreeDotsVertical />
        </button>
      </div>
    </div>
  );
};
export default GridViewFolderItem;
