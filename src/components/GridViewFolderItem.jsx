import {
  BsFolderFill,
  BsStar,
  BsStarFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { useNavigate } from "react-router";

const GridViewFolderItem = ({ folder, handleContextMenu }) => {
  const navigate = useNavigate();

  const openFolder = () => {
    navigate(`/drive/folder/${folder.id}`);
  };

  return (
    <div
      className="flex cursor-default items-center justify-between gap-2 rounded-lg bg-gray-200 px-4 py-3 hover:bg-gray-300"
      onDoubleClick={openFolder}
      onContextMenu={(e) => handleContextMenu(e, folder, "folder")}
    >
      <div className="flex items-center">
        <BsFolderFill className="mr-2 text-xl text-gray-500" />
        <span className="text-sm font-medium text-gray-800">{folder.name}</span>
      </div>
      <div className="flex items-center gap-2">
        {folder.starred ? (
          <BsStarFill className="ml-2 text-yellow-400" />
        ) : (
          <BsStar className="ml-2" />
        )}
        <button onClick={(e) => handleContextMenu(e, folder, "folder")}>
          <BsThreeDotsVertical />
        </button>
      </div>
    </div>
  );
};
export default GridViewFolderItem;
