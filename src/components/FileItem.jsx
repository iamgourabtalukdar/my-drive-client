import { formatDate } from "../utils/formatDate";
import { formatFileSize } from "../utils/formatFileSize";
import { getFileIcon } from "../utils/getFileIcon";

const FileItem = ({
  file,
  setSelectedFile,
  setShowPreview,
  setContextMenu,
  fileSelectClass,
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
      className={`border-b border-gray-100 hover:bg-[#f1f3f4] cursor-pointer ${fileSelectClass}`}
      onDoubleClick={() =>
        window.open(
          `${import.meta.env.VITE_API_BASE_URL}/files/${file.id}`,
          "_blank"
        )
      }
      onContextMenu={handleContextMenu}
    >
      <td className="px-4 py-3">
        <div className="flex items-center">
          <span className="material-icons mr-2 text-gray-500">
            {getFileIcon(file.extension)}
          </span>
          <span>
            {file.name}
            {file.extension}
          </span>
          {file.starred && (
            <span className="material-icons ml-2 text-yellow-400 text-sm">
              star
            </span>
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

export default FileItem;
