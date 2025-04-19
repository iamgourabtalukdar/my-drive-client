import {
  MdCreateNewFolder,
  MdDelete,
  MdFileUpload,
  MdOutlineDriveFolderUpload,
  MdOutlineStorage,
  MdPeople,
  MdSchedule,
  MdStar,
} from "react-icons/md";
import { Link } from "react-router";

const Sidebar = ({ classes, onUploadClick, setFileFolderModel }) => {
  return (
    <aside
      className={`h-full flex-col justify-between overflow-y-scroll border-r border-gray-200 bg-white p-4 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-4 lg:flex ${classes}`}
    >
      <div>
        <div className="space-y-1">
          <button className="flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-gray-100">
            <MdOutlineDriveFolderUpload className="text-2xl text-blue-500" />
            <span>New</span>
          </button>
          <button
            className="flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-gray-100"
            onClick={onUploadClick}
          >
            <MdFileUpload className="text-2xl text-blue-500" />
            <span>Upload File</span>
          </button>
          <button
            className="flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-gray-100"
            onClick={() =>
              setFileFolderModel({
                isVisible: true,
                action: "create new",
                type: "folder",
              })
            }
          >
            <MdCreateNewFolder className="text-2xl text-blue-500" />

            <span>New Folder</span>
          </button>
        </div>
        <div className="mt-8 space-y-1">
          <Link
            to="/drive/folder"
            className="flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-gray-100"
          >
            <MdOutlineStorage className="text-2xl text-gray-600" />
            <span>My Drive</span>
          </Link>
          <button className="flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-gray-100">
            <MdPeople className="text-2xl text-gray-600" />
            <span>Shared with me</span>
          </button>
          <Link
            to="/drive/recent"
            className="flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-gray-100"
          >
            <MdSchedule className="text-2xl text-gray-600" />
            <span>Recent</span>
          </Link>
          <Link
            to="/drive/starred"
            className="flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-gray-100"
          >
            <MdStar className="text-2xl text-gray-600" />
            <span>Starred</span>
          </Link>
          <Link
            to="/drive/trash"
            className="flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-gray-100"
          >
            <MdDelete className="text-2xl text-gray-600" />
            <span>Trash</span>
          </Link>
        </div>
      </div>
      <div className="mt-8 mb-6">
        <div className="mb-2 text-xs text-gray-500">Storage</div>
        <div className="h-2.5 w-full rounded-full bg-gray-200">
          <div
            className="h-2.5 rounded-full bg-blue-600"
            style={{ width: "45%" }}
          ></div>
        </div>
        <div className="mt-1 text-sm text-gray-600">7.5 GB of 15 GB used</div>
      </div>
    </aside>
  );
};

export default Sidebar;
