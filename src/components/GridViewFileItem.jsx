import { BsStarFill, BsThreeDotsVertical } from "react-icons/bs";
import { formatDate } from "../utils/formatDate";
import { formatSize } from "../utils/formatFileSize";
import { getFileIcon } from "../utils/getFileIcon";

const GridViewFileItem = ({
  file,
  handleContextMenu,
  openFileHandler,
  isTrash,
}) => {
  return (
    <div
      className={`rounded-md border border-gray-700/20 p-4 transition dark:border-gray-200/20 ${isTrash ? "bg-red-300 dark:bg-rose-950" : "hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800"}`}
      onContextMenu={(e) => handleContextMenu(e, { type: "file", ...file })}
      onClick={() => openFileHandler(file.id)}
    >
      <div className="mb-4 flex flex-row items-start justify-between gap-3">
        <div className="flex max-w-4/5 items-start gap-3">
          <div className="flex-shrink-0 rounded bg-gray-100 p-2 text-xl dark:bg-gray-700">
            {getFileIcon(file.extension)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{file.name} </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {file.extension}
            </p>
          </div>
          {file.isStarred && (
            <BsStarFill className="mt-1 text-sm text-yellow-400" />
          )}
        </div>
        <div className="flex justify-end gap-2 sm:justify-start">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleContextMenu(e, { type: "file", ...file });
            }}
            className="cursor-pointer rounded-full p-1 transition duration-100 hover:bg-gray-200 dark:hover:bg-gray-900"
          >
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>

      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
        <div>
          <span className="font-medium">Size: </span>
          {formatSize(file.size)}
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
