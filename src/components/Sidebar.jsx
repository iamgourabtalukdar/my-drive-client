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

const Sidebar = ({ onUploadClick, setFileFolderModel }) => {
  return (
    <aside className="max-w-64 w-full  border-r border-gray-200 p-4 h-[calc(100vh-65px)] overflow-y-scroll hidden md:block">
      <div className="space-y-1">
        <button className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left">
          <MdOutlineDriveFolderUpload className=" text-2xl text-blue-500" />
          <span>New</span>
        </button>
        <button
          className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left"
          onClick={onUploadClick}
        >
          <MdFileUpload className=" text-2xl text-blue-500" />
          <span>Upload File</span>
        </button>
        <button
          className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left"
          onClick={() =>
            setFileFolderModel({
              isVisible: true,
              action: "create new",
              type: "folder",
            })
          }
        >
          <MdCreateNewFolder className=" text-2xl text-blue-500" />

          <span>New Folder</span>
        </button>
      </div>
      <div className="mt-8 space-y-1">
        <Link
          to="/drive/folder"
          className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left"
        >
          <MdOutlineStorage className=" text-2xl text-gray-600" />
          <span>My Drive</span>
        </Link>
        <button className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left">
          <MdPeople className=" text-2xl text-gray-600" />
          <span>Shared with me</span>
        </button>
        <Link
          to="/drive/recent"
          className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left"
        >
          <MdSchedule className=" text-2xl text-gray-600" />
          <span>Recent</span>
        </Link>
        <Link
          to="/drive/starred"
          className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left"
        >
          <MdStar className=" text-2xl text-gray-600" />
          <span>Starred</span>
        </Link>
        <Link
          to="/drive/trash"
          className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left"
        >
          <MdDelete className=" text-2xl text-gray-600" />
          <span>Trash</span>
        </Link>
      </div>
      <div className="mt-8">
        <div className="text-xs text-gray-500 mb-2">Storage</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: "45%" }}
          ></div>
        </div>
        <div className="text-sm text-gray-600 mt-1">7.5 GB of 15 GB used</div>
      </div>
    </aside>
  );
};

export default Sidebar;
