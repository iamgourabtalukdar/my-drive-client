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
import { NavLink } from "react-router";

const Sidebar = ({
  classes,
  setIsCreatePopUp,
  setPopUpData,
  currentFolderId,
}) => {
  const handleNewFolderClick = () => {
    setPopUpData({
      action: "create new",
      type: "folder",
      item: { parentFolderId: currentFolderId },
    });
    setIsCreatePopUp(true);
  };

  return (
    <>
      <aside
        className={`h-full flex-col justify-between overflow-y-scroll border-r border-color/20 bg-color p-4 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-4 lg:flex ${classes}`}
      >
        <div>
          <div className="space-y-1">
            <button className="flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-hover">
              <MdOutlineDriveFolderUpload className="text-2xl text-blue-500" />
              <span>New</span>
            </button>
            <button
              className="flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-hover"
              // onClick={onUploadClick}
            >
              <MdFileUpload className="text-2xl text-blue-500" />
              <span>Upload File</span>
            </button>
            <button
              className="flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-hover"
              onClick={handleNewFolderClick}
            >
              <MdCreateNewFolder className="text-2xl text-blue-500" />

              <span>New Folder</span>
            </button>
          </div>
          <div className="mt-8 space-y-1">
            <NavLink
              to="/drive/folder"
              className={({ isActive }) =>
                `flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-hover ${
                  isActive ? "bg-hover" : ""
                }`
              }
            >
              <MdOutlineStorage className="text-2xl" />
              <span>My Drive</span>
            </NavLink>
            <button className="flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-hover">
              <MdPeople className="text-2xl" />
              <span>Shared with me</span>
            </button>
            <NavLink
              to="/drive/recent"
              className={({ isActive }) =>
                `flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-hover ${
                  isActive ? "bg-hover" : ""
                }`
              }
            >
              <MdSchedule className="text-2xl" />
              <span>Recent</span>
            </NavLink>
            <NavLink
              to="/drive/starred"
              className={({ isActive }) =>
                `flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-hover ${
                  isActive ? "bg-hover" : ""
                }`
              }
            >
              <MdStar className="text-2xl" />
              <span>Starred</span>
            </NavLink>
            <NavLink
              to="/drive/trash"
              className={({ isActive }) =>
                `flex w-full items-center space-x-3 rounded p-2 text-left hover:bg-hover ${
                  isActive ? "bg-hover" : ""
                }`
              }
            >
              <MdDelete className="text-2xl" />
              <span>Trash</span>
            </NavLink>
          </div>
        </div>
        <div className="mb-6 mt-8">
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
    </>
  );
};

export default Sidebar;
