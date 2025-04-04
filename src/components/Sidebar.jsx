const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-gray-200 p-4 hidden md:block">
      <div className="space-y-1">
        <button className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left">
          <span className="material-icons text-blue-500">
            drive_folder_upload
          </span>
          <span>New</span>
        </button>
        <button className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left">
          <span className="material-icons text-blue-500">upload</span>
          <span>Upload File</span>
        </button>
        <button className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left">
          <span className="material-icons text-blue-500">
            create_new_folder
          </span>
          <span>New Folder</span>
        </button>
      </div>
      <div className="mt-8 space-y-1">
        <button className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left">
          <span className="material-icons text-gray-600">storage</span>
          <span>My Drive</span>
        </button>
        <button className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left">
          <span className="material-icons text-gray-600">people</span>
          <span>Shared with me</span>
        </button>
        <button className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left">
          <span className="material-icons text-gray-600">schedule</span>
          <span>Recent</span>
        </button>
        <button className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left">
          <span className="material-icons text-gray-600">star</span>
          <span>Starred</span>
        </button>
        <button className="w-full flex items-center space-x-3 p-2 rounded hover:bg-gray-100 text-left">
          <span className="material-icons text-gray-600">delete</span>
          <span>Trash</span>
        </button>
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
