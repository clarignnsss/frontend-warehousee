import React, { useState } from "react";
import { Link } from "react-router-dom";

const WarehouseList = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <li
      className="group grow flex-auto "
      onClick={() => setMenuOpen(!isMenuOpen)}
    >
      <p className="flex items-center  space-x-1">
        <svg
          width="25"
          height="25"
          viewBox="0 0 41 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.5 3.08337L5.125 13.875V30.8334C5.125 31.6511 5.48497 32.4354 6.12572 33.0136C6.76647 33.5919 7.63551 33.9167 8.54167 33.9167H32.4583C33.3645 33.9167 34.2335 33.5919 34.8743 33.0136C35.515 32.4354 35.875 31.6511 35.875 30.8334V13.875L20.5 3.08337Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.375 33.9167V18.5H25.625V33.9167"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <Link className="block py-2 px-2 hover:text-[#FFC30D] text-[#9A9A9A]  transition duration-500  rounded-sm">
          Warehouse
        </Link>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={`${isMenuOpen ? "rotate-180" : ""}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="#9A9A9A"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </p>
      {isMenuOpen ? (
        <ul className="px-10 flex flex-col space-y-2 ">
          <li>
            <Link className="py-2 hover:text-[#62D64F]" to="warehouseview">
              Create
            </Link>
          </li>
        </ul>
      ) : (
        ""
      )}
    </li>
  );
};

export default WarehouseList;