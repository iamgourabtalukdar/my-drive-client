import {
  BsFolderFill,
  BsStar,
  BsStarFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { useNavigate } from "react-router";

const GridViewFolderItem = ({ folder }) => {
  const navigate = useNavigate();

  const openFolder = () => {
    navigate(`/drive/folder/${folder.id}`);
  };
  return (
    <div
      className="flex items-center justify-between gap-2 px-4 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-default"
      onDoubleClick={openFolder}
    >
      <div className="flex items-center">
        <BsFolderFill className="text-xl  mr-2 text-gray-500" />
        <span className="text-sm font-medium text-gray-800">{folder.name}</span>
      </div>
      <div className="flex items-center gap-2">
        {folder.starred ? (
          <BsStarFill className="ml-2 text-yellow-400" />
        ) : (
          <BsStar className="ml-2 " />
        )}
        <button className="cursor-pointer">
          <BsThreeDotsVertical />
        </button>
      </div>
    </div>
  );
};
export default GridViewFolderItem;
