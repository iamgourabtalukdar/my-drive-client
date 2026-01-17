import { BsStarFill } from "react-icons/bs";
import { formatDate } from "../utils/formatDate";
import { formatSize } from "../utils/formatFileSize";
import { getFileIcon } from "../utils/getFileIcon";

const ListViewFileItem = ({
  file,
  setSelectedFile,
  setShowPreview,
  openFileHandler,
  handleContextMenu,
  fileSelectClass,
  isTrash = false,
}) => {
  // const handleClick = () => {

  //   setSelectedFile(file);
  //   setShowPreview(true);
  // };

  return (
    <tr
      className={`border-b border-gray-700/10 dark:border-gray-300/20 ${isTrash ? "bg-red-300 dark:bg-rose-950" : "hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"} ${fileSelectClass}`}
      onClick={() => openFileHandler(file.id)}
      onContextMenu={(e) => handleContextMenu(e, { type: "file", ...file })}
    >
      <td className="flex items-center px-4 py-3">
        <span className="mr-2 text-xl">{getFileIcon(file.extension)}</span>
        <span className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
          {file.name}
          {file.extension}
        </span>
        {file.isStarred && (
          <BsStarFill className="ml-2 text-sm text-yellow-400" />
        )}
      </td>
      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
        {file.owner}
      </td>
      <td className="px-4 py-3 text-nowrap text-gray-600 dark:text-gray-400">
        {formatDate(file.lastModified)}
      </td>
      <td className="px-4 py-3 text-nowrap text-gray-600 dark:text-gray-400">
        {formatSize(file.size)}
      </td>
    </tr>
  );
};

export default ListViewFileItem;
