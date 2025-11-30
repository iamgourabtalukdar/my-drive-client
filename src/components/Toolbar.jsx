import {
  MdMenu,
  MdOutlineFormatListBulleted,
  MdOutlineGridView,
  MdRefresh,
} from "react-icons/md";
import Dropdown from "./Dropdown";
import { useContext } from "react";
import { DriveContext } from "../contexts/DriveContext";

const dropDownTypeItems = [
  { label: "Folders", icon: "📁" },
  { label: "Documents", icon: "📄" },
  { label: "Spreadsheets", icon: "📊" },
  { label: "Presentations", icon: "📑" },
  { label: "Vids", icon: "🎥" },
  { label: "Forms", icon: "📝" },
  { label: "Photos & images", icon: "🖼" },
  { label: "PDFs", icon: "📕" },
  { label: "Videos", icon: "🎬" },
  { label: "Archives (zip)", icon: "📦" },
  { label: "Audio", icon: "🎵" },
  { label: "Drawings", icon: "🎨" },
  { label: "Sites", icon: "🌍" },
  { label: "Shortcuts", icon: "🔗" },
];

const Toolbar = ({ setIsMenu, onRefresh }) => {
  const { isListView, setIsListView } = useContext(DriveContext);
  return (
    <div className="col-start-1 col-end-3 row-start-2 row-end-3 flex items-center justify-between border-b border-gray-700/20 px-2 md:px-4 lg:col-start-2 dark:border-gray-300/50">
      <div className="flex space-x-2">
        <button
          className="block rounded border border-gray-700/50 px-2 text-2xl focus:ring-1 focus:ring-blue-200 focus:outline-none lg:hidden dark:border-gray-300/50 dark:focus:ring-blue-800"
          onClick={() => setIsMenu((prevState) => !prevState)}
        >
          <MdMenu />
        </button>
        <Dropdown label="Type" menuItems={dropDownTypeItems} />
        <Dropdown label="People" menuItems={dropDownTypeItems} />
      </div>
      <div className="flex space-x-2">
        <button
          className="hover:bg-hover mr-0 flex cursor-pointer items-center rounded p-2 sm:mr-2"
          onClick={onRefresh}
        >
          <MdRefresh className="mr-1 text-2xl" />
          <span className="hidden text-sm sm:block">Refresh</span>
        </button>
        {isListView === "yes" ? (
          <button
            className="hover:bg-hover flex cursor-pointer items-center rounded p-2"
            onClick={() => setIsListView("no")}
          >
            <MdOutlineGridView className="mr-1 text-2xl" />
            <span className="hidden text-sm sm:block">Grid</span>
          </button>
        ) : (
          <button
            className="hover:bg-hover flex cursor-pointer items-center rounded p-2"
            onClick={() => setIsListView("yes")}
          >
            <MdOutlineFormatListBulleted className="mr-1 text-2xl" />
            <span className="hidden text-sm sm:block">List</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
