const Header = () => {
  return (
    <header className="border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-blue-500 font-bold text-xl mr-4">Drive</div>
          <nav className="flex space-x-6">
            <a
              href="#"
              className="text-blue-500 font-medium border-b-2 border-blue-500 pb-1"
            >
              My Drive
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Shared with me
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Recent
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              Starred
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search in Drive"
              className="bg-gray-100 rounded-md py-2 px-4 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <span className="material-icons absolute left-3 top-2 text-gray-500">
              search
            </span>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <span className="material-icons text-gray-600">settings</span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <span className="material-icons text-gray-600">apps</span>
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
            U
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
