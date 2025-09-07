import { BsStar, BsStarFill, BsThreeDotsVertical } from "react-icons/bs";
import { getFileIcon } from "../utils/getFileIcon";
import { formatDate } from "../utils/formatDate";
import { formatFileSize } from "../utils/formatFileSize";

const GridViewFileItem = ({ file, handleFileContextMenu, onStarredItem }) => {
  return (
    <div
      className="rounded-md border border-gray-700/20 p-4 transition hover:bg-gray-50 dark:border-gray-200/20 dark:bg-gray-900 dark:hover:bg-gray-800"
      onContextMenu={(e) => handleFileContextMenu(e, { type: "file", ...file })}
      onDoubleClick={() =>
        window.open(
          `${import.meta.env.VITE_API_BASE_URL}/file/${file.id}`,
          "_blank",
        )
      }
    >
      <div className="mb-4 flex flex-row items-start justify-between gap-3">
        <div className="flex max-w-4/5 items-center gap-3">
          <div className="flex-shrink-0 rounded bg-gray-100 p-2 text-xl dark:bg-gray-700">
            {getFileIcon(file.extension)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{file.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {file.extension}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2 sm:justify-start">
          {file.starred ? (
            <button
              className="transform text-yellow-400 duration-100 hover:scale-[1.4]"
              title="Remove from starred"
              onClick={() => onStarredItem("file", file.id, false)}
            >
              <BsStarFill />
            </button>
          ) : (
            <button
              className="transform transition duration-100 hover:scale-[1.3]"
              title="Add to starred"
              onClick={() => onStarredItem("file", file.id, true)}
            >
              <BsStar />
            </button>
          )}
          <button
            onClick={(e) => handleFileContextMenu(e, file, "file")}
            className="rounded-full p-1 transition duration-100 hover:bg-gray-200 dark:hover:bg-gray-900"
          >
            <BsThreeDotsVertical />
          </button>
        </div>
      </div>

      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
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
