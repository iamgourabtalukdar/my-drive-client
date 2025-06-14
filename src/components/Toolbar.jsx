import {
  MdInfoOutline,
  MdMenu,
  MdOutlineFormatListBulleted,
  MdOutlineGridView,
  MdOutlineViewAgenda,
  MdRefresh,
} from "react-icons/md";
import Dropdown from "./Dropdown";

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

const Toolbar = ({ onRefresh, isListView, setIsListView, setIsMenu }) => {
  return (
    <div className="col-start-1 col-end-3 row-start-2 row-end-3 flex items-center justify-between border-b border-gray-200 px-2 md:px-4 lg:col-start-2">
      <div className="flex space-x-2">
        <button
          className="block rounded border border-gray-300 px-2 text-2xl text-gray-700 lg:hidden"
          onClick={() => setIsMenu((prevState) => !prevState)}
        >
          <MdMenu />
        </button>
        <Dropdown label="Type" menuItems={dropDownTypeItems} />
        <Dropdown label="People" menuItems={dropDownTypeItems} />
      </div>
      <div className="flex space-x-2">
        <button
          className="mr-0 flex items-center rounded p-2 hover:bg-gray-100 sm:mr-2"
          onClick={onRefresh}
        >
          <MdRefresh className="mr-1 text-2xl text-gray-600" />
          <span className="hidden text-sm sm:block">Refresh</span>
        </button>
        {isListView ? (
          <button
            className="flex items-center rounded p-2 hover:bg-gray-100"
            onClick={() => setIsListView(false)}
          >
            <MdOutlineGridView className="mr-1 text-2xl text-gray-600" />
            <span className="hidden text-sm sm:block">Grid</span>
          </button>
        ) : (
          <button
            className="flex items-center rounded p-2 hover:bg-gray-100"
            onClick={() => setIsListView(true)}
          >
            <MdOutlineFormatListBulleted className="mr-1 text-2xl text-gray-600" />
            <span className="hidden text-sm sm:block">List</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
