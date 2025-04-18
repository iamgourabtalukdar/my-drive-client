import { BsStar, BsStarFill, BsThreeDotsVertical } from "react-icons/bs";
import { getFileIcon } from "../utils/getFileIcon";
import { formatDate } from "../utils/formatDate";
import { formatFileSize } from "../utils/formatFileSize";

const GridViewFileItem = ({
  file,
  handleContextMenu,
  onStarredItem,
  isTrash,
}) => {
  return (
    <div
      className={`group rounded-xl border p-4 shadow-sm transition hover:shadow-md ${isTrash ? "border-red-100 bg-red-50 hover:bg-red-100" : "border-gray-100 bg-white hover:bg-gray-100"}`}
      onContextMenu={(e) => handleContextMenu(e, file, "file")}
      onDoubleClick={() =>
        window.open(
          `${import.meta.env.VITE_API_BASE_URL}/file/${file.id}`,
          "_blank",
        )
      }
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`rounded ${isTrash ? "bg-red-100" : "bg-gray-100"} p-2 text-xl text-gray-500`}
          >
            {getFileIcon(file.extension)}
          </div>
          <div className="flex-1">
            <p className="truncate font-semibold text-gray-800">{file.name}</p>
            <p className="text-xs text-gray-500">{file.extension}</p>
          </div>
        </div>
        <div className="flex gap-2">
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
            onClick={(e) => handleContextMenu(e, file, "file")}
            className="rounded-full p-1 transition duration-100 hover:bg-gray-200"
          >
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
