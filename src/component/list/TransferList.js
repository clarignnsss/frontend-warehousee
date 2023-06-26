import React, { useState } from "react";
import { Link } from "react-router-dom";

const TransferList = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <li
      className="group grow flex-auto"
      onClick={() => setMenuOpen(!isMenuOpen)}
    >
      <p className="flex items-center  space-x-1">
        <svg
          width="24"
          height="24"
          viewBox="0 0 27 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.875 5V12.5H19.125"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M1.125 25V17.5H7.875"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.94875 11.25C4.51931 9.45845 5.48902 7.85673 6.7674 6.59425C8.04578 5.33176 9.59115 4.44968 11.2593 4.0303C12.9275 3.61091 14.6641 3.6679 16.3071 4.19594C17.9501 4.72398 19.4459 5.70586 20.655 7.04997L25.875 12.5M1.125 17.5L6.345 22.95C7.55409 24.2941 9.04992 25.276 10.6929 25.804C12.3359 26.332 14.0725 26.389 15.7407 25.9697C17.4089 25.5503 18.9542 24.6682 20.2326 23.4057C21.511 22.1432 22.4807 20.5415 23.0512 18.75"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <Link className="block py-2 px-2 hover:text-[#FFC30D]  text-[#9A9A9A]  transition duration-500  rounded-sm">
          <p>Transfer Process</p> <p>Between Warehouse</p>
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
              Transfer
            </Link>
          </li>
          <li>
            <Link className="py-2 hover:text-[#62D64F]" to="company">
              Received Transfer
            </Link>
          </li>
        </ul>
      ) : (
        ""
      )}
    </li>
  );
};

export default TransferList;