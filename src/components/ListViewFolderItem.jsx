import { useNavigate } from "react-router";
import { formatDate } from "../utils/formatDate";
import { BsFolderFill, BsStarFill } from "react-icons/bs";

const ListViewFolderItem = ({
  folder,
  setSelectedFile,
  setShowPreview,
  setContextMenu,
  fileSelectClass,
  isTrash,
}) => {
  const navigate = useNavigate();

  const openFolder = () => {
    navigate(`/drive/folder/${folder.id}`);
  };
  const handleDoubleClick = () => {
    // setSelectedFile(folder);
    // setShowPreview(true);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      type: "folder",
      item: folder,
    });
  };

  return (
    <tr
      className={`border-b   hover:bg-[#f1f3f4] cursor-pointer ${fileSelectClass} ${
        isTrash ? "border-white" : "border-gray-100"
      }`}
      onClick={isTrash ? () => {} : openFolder}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
    >
      <td className="px-4 py-3">
        <div className="flex items-center">
          <BsFolderFill className="text-xl  mr-2 text-gray-500" />

          <span>{folder.name}</span>
          {folder.starred && (
            <BsStarFill className="ml-2 text-yellow-400 text-sm" />
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-gray-600">{folder.owner}</td>
      <td className="px-4 py-3 text-gray-600">
        {formatDate(folder.lastModified)}
      </td>
      <td className="px-4 py-3 text-gray-600">-</td>
    </tr>
  );
};

export default ListViewFolderItem;
