import { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Dropdown = ({ label, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Dropdown Button */}
      <div className="flex gap-2">
        <button
          onClick={toggleDropdown}
          className="flex items-center rounded-md border border-gray-700/50 py-1 ps-3 pe-2 focus:ring-1 focus:ring-blue-200 focus:outline-none md:py-2 dark:border-gray-300/50 dark:focus:ring-blue-800"
        >
          <span>{label}</span>
          <IoMdArrowDropdown />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-48 rounded-md bg-gray-100 shadow dark:bg-gray-900">
          <ul className="py-2">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <span className="mr-2">{item.icon}</span> {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
