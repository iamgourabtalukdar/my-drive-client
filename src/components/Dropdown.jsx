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
          className="flex items-center rounded-md border border-gray-300 py-1 ps-3 pe-2 md:py-2"
        >
          <span>{label}</span>
          <IoMdArrowDropdown />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-48 rounded-md bg-white shadow-lg">
          <ul className="py-2 text-gray-700">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="flex cursor-pointer items-center px-4 py-2 hover:bg-gray-100"
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
