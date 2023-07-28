import React, { useState } from "react";
import { Link } from "react-router-dom";

const BuyingProcessList = () => {
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
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 29.3333C12.7364 29.3333 13.3334 28.7363 13.3334 28C13.3334 27.2636 12.7364 26.6666 12 26.6666C11.2636 26.6666 10.6667 27.2636 10.6667 28C10.6667 28.7363 11.2636 29.3333 12 29.3333Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M26.6666 29.3333C27.403 29.3333 28 28.7363 28 28C28 27.2636 27.403 26.6666 26.6666 26.6666C25.9303 26.6666 25.3333 27.2636 25.3333 28C25.3333 28.7363 25.9303 29.3333 26.6666 29.3333Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.33331 1.33337H6.66665L10.24 19.1867C10.3619 19.8006 10.6959 20.352 11.1834 20.7444C11.6709 21.1369 12.2809 21.3454 12.9066 21.3334H25.8666C26.4924 21.3454 27.1024 21.1369 27.5899 20.7444C28.0774 20.352 28.4114 19.8006 28.5333 19.1867L30.6666 8.00004H7.99998"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <Link className="block py-2 px-2 hover:text-[#FFC30D] text-[#9A9A9A]  transition duration-500  rounded-sm">
          Buying Process
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
            <Link className="py-2 hover:text-[#62D64F]" to="vendorview">
              Vendor
            </Link>
          </li>
          <li>
            <Link className="py-2 hover:text-[#62D64F]" to="poview">
              Purchase Order
            </Link>
          </li>
        </ul>
      ) : (
        ""
      )}
    </li>
  );
};

export default BuyingProcessList;