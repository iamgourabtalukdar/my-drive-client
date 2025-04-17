import { BsStar, BsStarFill, BsThreeDotsVertical } from "react-icons/bs";
import { getFileIcon } from "../utils/getFileIcon";
import { formatDate } from "../utils/formatDate";
import { formatFileSize } from "../utils/formatFileSize";

const GridViewFileItem = ({ file }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3 ">
          <div className="bg-gray-100 p-2 text-xl rounded">
            {getFileIcon(file.extension)}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800 truncate">{file.name}</p>
            <p className="text-xs text-gray-500">{file.extension}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {file.starred ? (
            <BsStarFill className="ml-2 text-yellow-400" />
          ) : (
            <BsStar className="ml-2 " />
          )}
          <BsThreeDotsVertical />
        </div>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
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
