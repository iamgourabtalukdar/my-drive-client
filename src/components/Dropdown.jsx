import { useState, useRef, useEffect } from "react";

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
          className="pe-2 ps-3 py-2 border border-gray-300 flex items-center rounded-md"
        >
          <span>{label}</span>
          <span className="material-icons text-sm ">arrow_drop_down</span>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md">
          <ul className="py-2 text-gray-700">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
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
