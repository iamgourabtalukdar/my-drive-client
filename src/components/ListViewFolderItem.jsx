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
      className={`cursor-default border-b border-gray-700/10 hover:bg-gray-50 dark:border-gray-300/20 dark:hover:bg-gray-800 ${fileSelectClass}`}
      onDoubleClick={
        isTrash ? () => {} : () => navigate(`/drive/folder/${folder.id}`)
      }
      onContextMenu={(e) =>
        handleFolderContextMenu(e, { type: "folder", ...folder })
      }
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
      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
        {folder.owner}
      </td>
      <td className="px-4 py-3 text-nowrap text-gray-600 dark:text-gray-400">
        {formatDate(folder.lastModified)}
      </td>
      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">-</td>
    </tr>
  );
};

export default ListViewFolderItem;
