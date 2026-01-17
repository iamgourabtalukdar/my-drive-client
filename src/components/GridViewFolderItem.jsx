import { BsFolderFill, BsStarFill, BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router";

const GridViewFolderItem = ({ folder, handleContextMenu, isTrash }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-md border border-gray-700/20 px-4 py-3 dark:border-gray-200/20 ${isTrash ? "bg-red-300 dark:bg-rose-950" : "hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"}`}
      onClick={
        isTrash ? () => {} : () => navigate(`/drive/folder/${folder.id}`)
      }
      onContextMenu={(e) => handleContextMenu(e, { type: "folder", ...folder })}
    >
      <div className="flex min-w-0 items-center gap-2">
        <BsFolderFill className="min-w-5 text-xl" />
        <span className="max-w-[80%] min-w-0 truncate text-sm font-medium">
          {folder.name}
        </span>
        {folder.isStarred && <BsStarFill className="text-sm text-yellow-400" />}
      </div>
      <div className="ml-2 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleContextMenu(e, { type: "folder", ...folder });
          }}
          className="cursor-pointer rounded-full p-1 transition duration-100 hover:bg-gray-100 dark:hover:bg-gray-900"
        >
          <BsThreeDotsVertical />
        </button>
      </div>
    </div>
  );
};
export default GridViewFolderItem;
