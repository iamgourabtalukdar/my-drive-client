import { BsFolderFill, BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router";

const GridViewFolderItem = ({ folder }) => {
  const navigate = useNavigate();

  const openFolder = () => {
    navigate(`/drive/folder/${folder.id}`);
  };
  return (
    <div
      className="flex items-center justify-between gap-2 px-4 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
      onClick={openFolder}
    >
      <div className="flex items-center">
        <BsFolderFill className="text-xl  mr-2 text-gray-500" />
        <span className="text-sm font-medium text-gray-800">{folder.name}</span>
      </div>
      <button className="cursor-pointer">
        <BsThreeDotsVertical />
      </button>
    </div>
  );
};
export default GridViewFolderItem;
