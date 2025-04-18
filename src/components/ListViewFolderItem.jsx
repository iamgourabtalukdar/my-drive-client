import { useNavigate } from "react-router";
import { formatDate } from "../utils/formatDate";
import { BsFolderFill, BsStarFill } from "react-icons/bs";

const ListViewFolderItem = ({
  folder,
  setSelectedFile,
  setShowPreview,
  handleContextMenu,
  fileSelectClass,
  isTrash = false,
}) => {
  const navigate = useNavigate();

  // const handleClick = () => {
  //   // setSelectedFile(folder);
  //   // setShowPreview(true);
  // };

  return (
    <tr
      className={`cursor-default border-b hover:bg-[#f1f3f4] ${fileSelectClass} ${
        isTrash ? "border-white" : "border-gray-100"
      }`}
      onDoubleClick={
        isTrash ? () => {} : () => navigate(`/drive/folder/${folder.id}`)
      }
      onContextMenu={(e) => handleContextMenu(e, folder, "folder")}
    >
      <td className="px-4 py-3">
        <div className="flex items-center">
          <BsFolderFill className="mr-2 text-xl text-gray-500" />

          <span>{folder.name}</span>
          {folder.starred && (
            <BsStarFill className="ml-2 text-sm text-yellow-400" />
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
