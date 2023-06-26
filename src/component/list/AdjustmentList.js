import React from "react";
import { Link } from "react-router-dom";

const AdjustmentList = () => {
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
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.6667 2.16663H4.33335C3.13674 2.16663 2.16669 3.13668 2.16669 4.33329V8.66663C2.16669 9.86324 3.13674 10.8333 4.33335 10.8333H21.6667C22.8633 10.8333 23.8334 9.86324 23.8334 8.66663V4.33329C23.8334 3.13668 22.8633 2.16663 21.6667 2.16663Z"
            stroke="white"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M21.6667 15.1666H4.33335C3.13674 15.1666 2.16669 16.1367 2.16669 17.3333V21.6666C2.16669 22.8632 3.13674 23.8333 4.33335 23.8333H21.6667C22.8633 23.8333 23.8334 22.8632 23.8334 21.6666V17.3333C23.8334 16.1367 22.8633 15.1666 21.6667 15.1666Z"
            stroke="white"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.5 6.5H6.51083"
            stroke="white"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6.5 19.5H6.51083"
            stroke="white"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <Link className="block py-2 px-2 hover:text-[#FFC30D] text-[#9A9A9A]  transition duration-500  rounded-sm">
          Adjustment
        </Link>
      </p>
    </li>
  );
};

export default AdjustmentList;