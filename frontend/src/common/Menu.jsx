// src/components/Menu.jsx

import React, { useState } from "react";
import { Link } from "react-router";

const Menu = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="w-64 bg-teal-300  text-white h-screen">
      <nav className="p-4">
        {/* Customer Menu */}
        <div className="mb-4">
          <Link to="/">
            <button className="w-full flex justify-between items-center px-4 py-2 text-left bg-black rounded-md hover:bg-white hover:text-black">
              Home
            </button>
          </Link>
        </div>

        {/*customer menu */}

        <div className="mb-4">
          <button
            className="w-full flex justify-between items-center px-4 py-2 text-left bg-black rounded-md hover:bg-white hover:text-black"
            onClick={() => toggleMenu("customer")}
          >
            Customer
            <span className="ml-2">{openMenu === "customer" ? "▲" : "▼"}</span>
          </button>
          {openMenu === "customer" && (
            <ul className="mt-2 ml-4">
              <Link to="/add-customer">
                <li className="py-1 hover:underline cursor-pointer">
                  Add Customer
                </li>
              </Link>
              <Link to="/show-customer">
                <li className="py-1 hover:underline cursor-pointer">
                  Show Customer
                </li>
              </Link>
              <Link to="/distribute">
                <li className="py-1 hover:underline cursor-pointer">
                  Distribute
                </li>
              </Link>
            </ul>
          )}
        </div>

        {/* Package Menu */}
        <div>
          <button
            className="w-full flex justify-between items-center px-4 py-2 text-left bg-black rounded-md hover:bg-white hover:text-black"
            onClick={() => toggleMenu("package")}
          >
            Package
            <span className="ml-2">{openMenu === "package" ? "▲" : "▼"}</span>
          </button>
          {openMenu === "package" && (
            <ul className="mt-2 ml-4">
              <Link to="/add-pckg">
                <li className="py-1 hover:underline cursor-pointer">
                  Add Package
                </li>
              </Link>
              <Link to="/show-pckgs">
                <li className="py-1 hover:underline cursor-pointer">
                  Show Package
                </li>
              </Link>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Menu;
