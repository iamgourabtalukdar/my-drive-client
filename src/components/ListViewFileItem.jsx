import { BsStarFill } from "react-icons/bs";
import { formatDate } from "../utils/formatDate";
import { formatFileSize } from "../utils/formatFileSize";
import { getFileIcon } from "../utils/getFileIcon";

const ListViewFileItem = ({
  file,
  setSelectedFile,
  setShowPreview,
  handleFileContextMenu,
  fileSelectClass,
  isTrash = false,
}) => {
  // const handleClick = () => {

  //   setSelectedFile(file);
  //   setShowPreview(true);
  // };

  return (
    <tr
      className={`hover:bg-hover cursor-default border-b border-color/20 dark:border-color/30 ${fileSelectClass} ${
        isTrash ? "border-white" : "border-gray-100"
      }`}
      onDoubleClick={() =>
        window.open(
          `${import.meta.env.VITE_API_BASE_URL}/file/${file.id}`,
          "_blank",
        )
      }
      onContextMenu={(e) => handleFileContextMenu(e, file)}
    >
      <td className="flex items-center px-4 py-3">
        <span className="mr-2 text-xl">{getFileIcon(file.extension)}</span>
        <span className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
          {file.name}
          {file.extension}
        </span>
        {file.starred && (
          <BsStarFill className="ml-2 text-sm text-yellow-400" />
        )}
      </td>
      <td className="px-4 py-3 text-sub-color">{file.owner}</td>
      <td className="text-nowrap px-4 py-3 text-sub-color">
        {formatDate(file.lastModified)}
      </td>
      <td className="text-nowrap px-4 py-3 text-sub-color">
        {formatFileSize(file.size)}
      </td>
    </tr>
  );
};

export default ListViewFileItem;
