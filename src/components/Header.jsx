import { googleLogout } from "@react-oauth/google";
import { useContext, useRef, useState } from "react";
import { BiHelpCircle, BiLogOut, BiRocket } from "react-icons/bi";
import { BsMoon, BsSun } from "react-icons/bs";
import { MdSettings } from "react-icons/md";
import { Link, NavLink, useNavigate, useOutletContext } from "react-router";
import { ThemeContext } from "../contexts/ThemeContext";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { logout } from "../services/auth.service";
import { capitalize } from "../utils/stringOperations";
import logo from "../assets/images/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useContext(ThemeContext);

  const { user } = useOutletContext();

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Call the hook to close the dropdown
  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  // This check prevents errors if the user data is not yet loaded
  if (!user) {
    return null;
  }

  const menuItems = [
    { icon: <MdSettings size={18} />, text: "Profile Settings" },
    { icon: <BiHelpCircle size={18} />, text: "Help Center" },
    { icon: <BiRocket size={18} />, text: "Upgrade Plan" },
  ];
  return (
    <header className="col-span-3 border-b border-gray-700/20 px-4 py-3 dark:border-gray-300/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/drive/folder">
            <img src={logo} alt="Logo" className="mr-4 h-8 w-auto" />
          </Link>

          <nav className="hidden space-x-6 md:flex">
            <NavLink
              to="/drive/folder"
              className={({ isActive }) =>
                `font-medium hover:text-blue-500 ${isActive ? "border-b-2 border-blue-500 text-blue-500" : ""}`
              }
            >
              My Drive
            </NavLink>
            {/* <NavLink to="#" className={({ isActive }) =>
                `font-medium hover:text-blue-500 ${isActive ? "border-b-2 border-blue-500 text-blue-500" : ""}`
              }>
              Shared with me
            </NavLink> */}

            <NavLink
              to="/drive/starred"
              className={({ isActive }) =>
                `font-medium hover:text-blue-500 ${isActive ? "border-b-2 border-blue-500 text-blue-500" : ""}`
              }
            >
              Starred
            </NavLink>
            <NavLink
              to="/drive/trash"
              className={({ isActive }) =>
                `font-medium hover:text-blue-500 ${isActive ? "border-b-2 border-blue-500 text-blue-500" : ""}`
              }
            >
              Trash
            </NavLink>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {/* <div className="relative hidden lg:block">
            <input
              type="text"
              id="search-input"
              placeholder="Search in Drive"
              className="w-64 rounded-md border border-gray-700/20 bg-gray-50 px-4 py-2 pl-10 focus:ring-1 focus:ring-blue-200 focus:outline-none dark:border-gray-300/50 dark:bg-gray-900/50 dark:focus:ring-blue-800"
            />

            <label htmlFor="search-input">
              <BsSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
            </label>
          </div> */}

          <div className="relative" ref={dropdownRef}>
            <button
              className="flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-gray-700 text-white dark:border-gray-500"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {user.picture ? (
                <img
                  src={user.picture}
                  alt="profile"
                  referrerPolicy="no-referrer"
                  className="h-full w-full"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-blue-700 text-white">
                  {capitalize(user.name?.charAt(0))}
                </span>
              )}
            </button>

            {isOpen && (
              <div className="ring-opacity-5 absolute right-0 mt-2 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black transition-all duration-300 focus:outline-none dark:bg-gray-800">
                {/* Profile Header */}

                <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-3 dark:border-gray-700">
                  <div className="h-10 w-10 overflow-hidden rounded-full border border-gray-700 dark:border-gray-500">
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt="profile_img"
                        className="h-full w-full"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-500 text-white">
                        {capitalize(user.name?.charAt(0))}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {capitalize(user.name)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                  <div>
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                      PRO
                    </span>
                  </div>
                </div>
                {/* Menu Items */}
                <div className="py-2">
                  {/* {menuItems.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      {item.icon}
                      <span>{item.text}</span>
                    </a>
                  ))} */}

                  {/* Theme Toggle */}
                  <button
                    onClick={() => {
                      setTheme(theme === "light" ? "dark" : "light");
                      setIsOpen(false);
                    }}
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    {theme === "light" ? (
                      <>
                        <BsMoon size={18} />
                        <span>Dark Mode</span>
                      </>
                    ) : (
                      <>
                        <BsSun size={18} />
                        <span>Light Mode</span>
                      </>
                    )}
                  </button>
                </div>
                {/* Sign Out */}
                <div className="border-t border-gray-200 dark:border-gray-700">
                  <button
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={async () => {
                      await logout();
                      googleLogout();
                      navigate("/login");
                    }}
                  >
                    <BiLogOut size={18} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
