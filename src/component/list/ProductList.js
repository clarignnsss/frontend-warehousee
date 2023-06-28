import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <li
      className="group grow flex-auto"
      onClick={() => setMenuOpen(!isMenuOpen)}
    >
      <p className="flex items-center  space-x-1">
        <svg
          width="25"
          height="25"
          viewBox="0 0 34 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.25 8.00008L8.5 2.66675H25.5L29.75 8.00008V26.6667C29.75 27.374 29.4515 28.0523 28.9201 28.5524C28.3888 29.0525 27.6681 29.3334 26.9167 29.3334H7.08333C6.33189 29.3334 5.61122 29.0525 5.07986 28.5524C4.54851 28.0523 4.25 27.374 4.25 26.6667V8.00008Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.25 8H29.75"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22.6666 13.3333C22.6666 14.7477 22.0696 16.1043 21.0069 17.1045C19.9442 18.1047 18.5028 18.6666 16.9999 18.6666C15.497 18.6666 14.0557 18.1047 12.993 17.1045C11.9303 16.1043 11.3333 14.7477 11.3333 13.3333"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <Link className="block py-2 px-2 hover:text-[#FFC30D] text-[#9A9A9A]  transition duration-500  rounded-sm">
          Product
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
            <Link className="py-2 hover:text-[#62D64F]" to="productview">
              Product
            </Link>
          </li>
          <li>
            <Link className="py-2 hover:text-[#62D64F]" to="attributeview">
              Attribute
            </Link>
          </li>
          <li>
            <Link className="py-2 hover:text-[#62D64F]" to="attrvalueview">
              Attribute Value
            </Link>
          </li>
          <li>
            <Link className="py-2 hover:text-[#62D64F]" to="productattrview">
              Product Attribute
            </Link>
          </li>

          <li>
            <Link className="py-2 hover:text-[#62D64F]" to="uomview">
              UOM
            </Link>
          </li>
          <li>
            <Link className="py-2 hover:text-[#62D64F]" to="productunitview">
              Product Unit Conversion
            </Link>
          </li>
        </ul>
      ) : (
        ""
      )}
    </li>
  );
};

export default ProductList;