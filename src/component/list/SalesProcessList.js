import React, { useState } from "react";
import { Link } from "react-router-dom";

const SalesProcessList = () => {
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
          viewBox="0 0 28 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.6566 24.8675L24.0216 16.2037C24.4562 15.7509 24.7002 15.1384 24.7002 14.5C24.7002 13.8615 24.4562 13.249 24.0216 12.7962L14 2.41663H2.33331V14.5L12.355 24.8675C12.5717 25.0922 12.829 25.2704 13.1123 25.392C13.3955 25.5136 13.6992 25.5762 14.0058 25.5762C14.3124 25.5762 14.6161 25.5136 14.8993 25.392C15.1826 25.2704 15.4399 25.0922 15.6566 24.8675Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.16669 8.45837H8.17835"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <Link className="block py-2 px-2 hover:text-[#FFC30D] text-[#9A9A9A]  transition duration-500  rounded-sm">
          Sales Process
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
            <Link className="py-2 hover:text-[#62D64F]" to="company">
              Sales Order
            </Link>
          </li>
          <li>
            <Link className="py-2 hover:text-[#62D64F]" to="company">
              Shipment
            </Link>
          </li>
          <li>
            <Link className="py-2 hover:text-[#62D64F]" to="company">
              Customer
            </Link>
          </li>
        </ul>
      ) : (
        ""
      )}
    </li>
  );
};

export default SalesProcessList;