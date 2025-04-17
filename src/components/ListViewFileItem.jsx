import { BsStarFill } from "react-icons/bs";
import { formatDate } from "../utils/formatDate";
import { formatFileSize } from "../utils/formatFileSize";
import { getFileIcon } from "../utils/getFileIcon";

const ListViewFileItem = ({
  file,
  setSelectedFile,
  setShowPreview,
  setContextMenu,
  fileSelectClass,
  isTrash,
}) => {
  // const handleClick = () => {

  //   setSelectedFile(file);
  //   setShowPreview(true);
  // };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      type: "file",
      item: file,
    });
  };

  return (
    <tr
      className={`border-b border-gray-100 hover:bg-[#f1f3f4] cursor-default ${fileSelectClass} ${
        isTrash ? "border-white" : "border-gray-100"
      }`}
      onDoubleClick={() =>
        window.open(
          `${import.meta.env.VITE_API_BASE_URL}/file/${file.id}`,
          "_blank"
        )
      }
      onContextMenu={handleContextMenu}
    >
      <td className="px-4 py-3">
        <div className="flex items-center">
          <span className=" mr-2 text-xl text-gray-500">
            {getFileIcon(file.extension)}
          </span>
          <span>
            {file.name}
            {file.extension}
          </span>
          {file.starred && (
            <BsStarFill className="ml-2 text-yellow-400 text-sm" />
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-gray-600">{file.owner}</td>
      <td className="px-4 py-3 text-gray-600">
        {formatDate(file.lastModified)}
      </td>
      <td className="px-4 py-3 text-gray-600">{formatFileSize(file.size)}</td>
    </tr>
  );
};

export default ListViewFileItem;
