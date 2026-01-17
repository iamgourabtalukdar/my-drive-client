import {
  MdCreateNewFolder,
  MdDelete,
  MdFileUpload,
  MdOutlineDriveFolderUpload,
  MdOutlineStorage,
  MdStar,
} from "react-icons/md";
import { NavLink, useOutletContext } from "react-router";
import { formatSize } from "../utils/formatFileSize";

const Sidebar = ({ classes, setPopUp, setIsFileUpload, currentFolderId }) => {
  const { storageInfo } = useOutletContext();

  return (
    <>
      <aside
        className={`h-full flex-col justify-between overflow-y-scroll border-r border-gray-700/20 bg-white p-4 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-4 lg:flex dark:border-gray-300/50 dark:bg-gray-950 ${classes}`}
      >
        <div>
          <div className="space-y-1">
            <button
              className="flex w-full cursor-pointer items-center space-x-3 rounded p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsFileUpload(true)}
            >
              <MdFileUpload className="text-2xl text-blue-500" />
              <span>Upload File</span>
            </button>
            <button
              className="flex w-full cursor-pointer items-center space-x-3 rounded p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => {
                setPopUp({
                  actionType: "create_folder",
                  title: "Create New Folder",
                  subText: "Folder Name",
                  placeholder: "Enter folder name",
                  data: { parentFolderId: currentFolderId },
                });
              }}
            >
              <MdCreateNewFolder className="text-2xl text-blue-500" />

              <span>New Folder</span>
            </button>
          </div>
          <div className="mt-8 space-y-1">
            <NavLink
              to="/drive/folder"
              className={({ isActive }) =>
                `flex w-full cursor-pointer items-center space-x-3 rounded p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isActive ? "bg-gray-100 dark:bg-gray-800" : ""
                }`
              }
            >
              <MdOutlineStorage className="text-2xl" />
              <span>My Drive</span>
            </NavLink>
            {/* <button className="flex w-full cursor-pointer items-center space-x-3 rounded p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800">
              <MdPeople className="text-2xl" />
              <span>Shared with me</span>
            </button>
            <NavLink
              to="/drive/recent"
              className={({ isActive }) =>
                `flex w-full cursor-pointer items-center space-x-3 rounded p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isActive ? "bg-gray-100 dark:bg-gray-800" : ""
                }`
              }
            >
              <MdSchedule className="text-2xl" />
              <span>Recent</span>
            </NavLink> */}
            <NavLink
              to="/drive/starred"
              className={({ isActive }) =>
                `flex w-full cursor-pointer items-center space-x-3 rounded p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isActive ? "bg-gray-100 dark:bg-gray-800" : ""
                }`
              }
            >
              <MdStar className="text-2xl" />
              <span>Starred</span>
            </NavLink>
            <NavLink
              to="/drive/trash"
              className={({ isActive }) =>
                `flex w-full cursor-pointer items-center space-x-3 rounded p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  isActive ? "bg-gray-100 dark:bg-gray-800" : ""
                }`
              }
            >
              <MdDelete className="text-2xl" />
              <span>Trash</span>
            </NavLink>
          </div>
        </div>
        <div className="mt-8 mb-6">
          <div className="mb-2 text-xs text-gray-600 dark:text-gray-300">
            Storage
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-300 dark:bg-gray-400">
            <div
              className="h-2.5 rounded-full bg-blue-600"
              style={{
                width: `${(storageInfo.usedStorage / storageInfo.storageSize) * 100}%`,
              }}
            ></div>
          </div>
          <div className="mt-1 text-sm text-gray-500 dark:text-gray-500">
            {`${formatSize(storageInfo.usedStorage)} of ${formatSize(storageInfo.storageSize)} used`}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
