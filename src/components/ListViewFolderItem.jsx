import { useNavigate } from "react-router";
import { formatDate } from "../utils/formatDate";
import { BsFolderFill, BsStarFill } from "react-icons/bs";

const ListViewFolderItem = ({
  folder,
  setSelectedFile,
  setShowPreview,
  handleFolderContextMenu,
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
      className={`hover:bg-hover cursor-default border-b border-color/20 dark:border-color/30 ${fileSelectClass} ${
        isTrash ? "border-white" : "border-gray-100"
      }`}
      onDoubleClick={
        isTrash ? () => {} : () => navigate(`/drive/folder/${folder.id}`)
      }
      onContextMenu={(e) => handleFolderContextMenu(e, folder)}
    >
      <td className="px-4 py-3">
        <div className="flex items-center">
          <BsFolderFill className="mr-2 text-xl" />

          <span>{folder.name}</span>
          {folder.starred && (
            <BsStarFill className="ml-2 text-sm text-yellow-400" />
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-sub-color">{folder.owner}</td>
      <td className="text-nowrap px-4 py-3 text-sub-color">
        {formatDate(folder.lastModified)}
      </td>
      <td className="px-4 py-3 text-sub-color">-</td>
    </tr>
  );
};

export default ListViewFolderItem;
