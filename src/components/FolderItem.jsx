import { useNavigate } from "react-router";
import { formatDate } from "../utils/formatDate";
import { getFileIcon } from "../utils/getFileIcon";

const FolderItem = ({
  folder,
  setSelectedFile,
  setShowPreview,
  setContextMenu,
  fileSelectClass,
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/drive/folder/${folder.id}`);
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
      folder: folder,
    });
  };

  return (
    <tr
      className={`border-b border-gray-100 hover:bg-[#f1f3f4] cursor-pointer ${fileSelectClass}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <td className="px-4 py-3">
        <div className="flex items-center">
          <span className="material-icons mr-2 text-gray-500">folder</span>
          <span>{folder.name}</span>
          {folder.starred && (
            <span className="material-icons ml-2 text-yellow-400 text-sm">
              star
            </span>
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

export default FolderItem;
