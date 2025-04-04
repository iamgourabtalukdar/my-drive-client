const Toolbar = () => {
  return (
    <div className="border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex space-x-2">
        <button className="p-2 rounded hover:bg-gray-100 flex items-center">
          <span className="material-icons text-gray-600 mr-1">refresh</span>
          <span className="text-sm">Refresh</span>
        </button>
        <button className="p-2 rounded hover:bg-gray-100 flex items-center">
          <span className="material-icons text-gray-600 mr-1">view_agenda</span>
          <span className="text-sm">View</span>
        </button>
        <button className="p-2 rounded hover:bg-gray-100 flex items-center">
          <span className="material-icons text-gray-600 mr-1">info</span>
          <span className="text-sm">Details</span>
        </button>
      </div>
      <div className="flex space-x-2">
        <button className="p-2 rounded hover:bg-gray-100">
          <span className="material-icons text-gray-600">sort</span>
        </button>
        <button className="p-2 rounded hover:bg-gray-100">
          <span className="material-icons text-gray-600">more_vert</span>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
