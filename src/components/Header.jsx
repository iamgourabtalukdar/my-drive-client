import { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { MdApps, MdSettings } from "react-icons/md";
import { ThemeContext } from "../contexts/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const [theme, setTheme] = useContext(ThemeContext);
  return (
    <header className="col-span-3 border-b border-gray-700/20 px-4 py-3 dark:border-gray-300/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4 text-xl font-bold text-blue-500">Drive</div>
          <nav className="hidden space-x-6 md:flex">
            <a
              href="#"
              className="border-b-2 border-blue-500 pb-1 font-medium text-blue-500"
            >
              My Drive
            </a>
            <a href="#" className="hover:text-blue-500">
              Shared with me
            </a>
            <a href="#" className="hover:text-blue-500">
              Recent
            </a>
            <a href="#" className="hover:text-blue-500">
              Starred
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden lg:block">
            <input
              type="text"
              id="search-input"
              placeholder="Search in Drive"
              className="w-64 rounded-md border border-gray-700/20 bg-gray-50 px-4 py-2 pl-10 focus:ring-1 focus:ring-blue-200 focus:outline-none dark:border-gray-300/50 dark:bg-gray-900/50 dark:focus:ring-blue-800"
            />

            <label htmlFor="search-input">
              <BsSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
            </label>
          </div>
          <div className="me-0 sm:me-2 md:me-8">
            {theme === "light" ? (
              <button
                title="Turn On Dark Theme"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 focus:ring-1 focus:ring-blue-200 focus:outline-none dark:border-gray-300/50 dark:focus:ring-blue-800"
                onClick={(e) => {
                  e.stopPropagation();
                  setTheme("dark");
                }}
              >
                <FaMoon className="text-sm" />
              </button>
            ) : (
              <button
                title="Turn On Light Theme"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-700/50 focus:ring-1 focus:ring-blue-200 focus:outline-none dark:border-gray-300/50 dark:focus:ring-blue-800"
                onClick={(e) => {
                  e.stopPropagation();
                  setTheme("light");
                }}
              >
                <FaSun className="text-sm" />
              </button>
            )}
          </div>
          <button className="rounded-full p-2 text-xl">
            <MdSettings />
          </button>
          <button className="rounded-full p-2 text-xl">
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
