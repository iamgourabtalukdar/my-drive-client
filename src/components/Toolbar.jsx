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

const Toolbar = ({ onRefresh, isListView, setIsListView }) => {
  return (
    <div className="border-b border-gray-200 px-4 pb-4 flex items-center justify-between">
      <div className="flex space-x-2">
        <Dropdown label="Type" menuItems={dropDownTypeItems} />
        <Dropdown label="People" menuItems={dropDownTypeItems} />
      </div>
      <div className="flex space-x-2">
        <button
          className="p-2 rounded hover:bg-gray-100 flex items-center"
          onClick={onRefresh}
        >
          <MdRefresh className="text-gray-600 mr-1 text-2xl" />
          <span className="text-sm">Refresh</span>
        </button>
        {isListView ? (
          <button
            className="p-2 rounded hover:bg-gray-100 flex items-center"
            onClick={() => setIsListView(false)}
          >
            <MdOutlineGridView className="text-gray-600 mr-1 text-2xl" />
            <span className="text-sm">Grid</span>
          </button>
        ) : (
          <button
            className="p-2 rounded hover:bg-gray-100 flex items-center"
            onClick={() => setIsListView(true)}
          >
            <MdOutlineFormatListBulleted className="text-gray-600 mr-1 text-2xl" />
            <span className="text-sm">List</span>
          </button>
        )}

        <button className="p-2 rounded hover:bg-gray-100 flex items-center">
          <MdInfoOutline className="text-gray-600 mr-1 text-2xl" />
          <span className="text-sm">Details</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
