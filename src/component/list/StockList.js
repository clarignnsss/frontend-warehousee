import React from "react";
import { Link } from "react-router-dom";
const StockList = () => {
  return (
    <li
      className="group grow flex-auto"
      // onClick={() => setMenuOpen(!isMenuOpen)
      // }
    >
      <p className="flex items-center  space-x-1">
        <svg
          width="25"
          height="25"
          viewBox="0 0 34 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M29.75 11V28.875H4.25V11"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M32.5834 4.125H1.41669V11H32.5834V4.125Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.1667 16.5H19.8334"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <Link className="block py-2 px-2 hover:text-[#FFC30D] text-[#9A9A9A]  transition duration-500  rounded-sm">
          Stock
        </Link>
      </p>
    </li>
  );
};

export default StockList;