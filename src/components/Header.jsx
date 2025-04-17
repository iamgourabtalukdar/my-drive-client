import { BsSearch } from "react-icons/bs";
import { MdApps, MdSettings } from "react-icons/md";

const Header = () => {
  return (
    <header className="col-span-3 border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 text-xl font-bold text-blue-500">Drive</div>
          <nav className="flex space-x-6">
            <a
              href="#"
              className="border-b-2 border-blue-500 pb-1 font-medium text-blue-500"
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
              id="search-input"
              placeholder="Search in Drive"
              className="w-64 rounded-md bg-gray-100 px-4 py-2 pl-10 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />

            <label htmlFor="search-input">
              <BsSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
            </label>
          </div>
          <button className="rounded-full p-2 text-2xl text-gray-600 hover:bg-gray-100">
            <MdSettings />
          </button>
          <button className="rounded-full p-2 text-2xl text-gray-600 hover:bg-gray-100">
            <MdApps />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
            U
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
