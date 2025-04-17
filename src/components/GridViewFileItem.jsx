import { BsStar, BsStarFill, BsThreeDotsVertical } from "react-icons/bs";
import { getFileIcon } from "../utils/getFileIcon";
import { formatDate } from "../utils/formatDate";
import { formatFileSize } from "../utils/formatFileSize";

const GridViewFileItem = ({ file, handleContextMenu }) => {
  return (
    <div
      className="group rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md"
      onContextMenu={(e) => handleContextMenu(e, file, "file")}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded bg-gray-100 p-2 text-xl">
            {getFileIcon(file.extension)}
          </div>
          <div className="flex-1">
            <p className="truncate font-semibold text-gray-800">{file.name}</p>
            <p className="text-xs text-gray-500">{file.extension}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {file.starred ? (
            <button>
              <BsStarFill className="ml-2 text-yellow-400" />
            </button>
          ) : (
            <button>
              <BsStar className="ml-2" />
            </button>
          )}
          <button onClick={(e) => handleContextMenu(e, file, "file")}>
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>

      <div className="space-y-1 text-sm text-gray-600">
        <div>
          <span className="font-medium">Size: </span>
          {formatFileSize(file.size)}
        </div>
        <div>
          <span className="font-medium">Modified: </span>
          {formatDate(file.lastModified)}
        </div>
        <div>
          <span className="font-medium">Owner: </span>
          {file.owner}
        </div>
      </div>
    </div>
  );
};
export default GridViewFileItem;
