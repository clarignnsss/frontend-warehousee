import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";

const Sidebar = (props) => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/users/profile", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUserInfo(data));
  }, []);

  const logout = (evt) => {
    evt.preventDefault();
    fetch("http://localhost:4000/api/users/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    nav("/");
  };
  const handleMenuOpen = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div
        id="sidebar"
        className={`bg-black w-64 absolute h-screen inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ${
          !props.isOpen ? "-translate-x-full" : "translate-x-0"
        } z-20`}
      >
        <div className="px-4 py-6 flex flex-col space-y-5  text-white">
          <nav>
            <ul>
              <li className="group flex items-center  space-x-1">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 37 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M32.375 12.0001V24.0001C32.3744 24.5262 32.2317 25.0429 31.9611 25.4984C31.6905 25.9538 31.3016 26.3321 30.8333 26.5951L20.0417 32.5951C19.5729 32.8584 19.0412 32.997 18.5 32.997C17.9588 32.997 17.4271 32.8584 16.9583 32.5951L6.16667 26.5951C5.6984 26.3321 5.30947 25.9538 5.03888 25.4984C4.76829 25.0429 4.62555 24.5262 4.625 24.0001V12.0001C4.62555 11.474 4.76829 10.9573 5.03888 10.5018C5.30947 10.0464 5.6984 9.66814 6.16667 9.4051L16.9583 3.4051C17.4271 3.14179 17.9588 3.00317 18.5 3.00317C19.0412 3.00317 19.5729 3.14179 20.0417 3.4051L30.8333 9.4051C31.3016 9.66814 31.6905 10.0464 31.9611 10.5018C32.2317 10.9573 32.3744 11.474 32.375 12.0001Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5.04126 10.4399L18.5 18.0149L31.9588 10.4399"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.5 33.12V18"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <Link
                  to="/"
                  className="block py-2 px-2 hover:text-[#FFC30D] text-[#9A9A9A]  transition duration-500  rounded-sm"
                >
                  Dashboard
                </Link>
              </li>
              <li className="group" onClick={handleMenuOpen}>
                <p className="flex items-center space-x-1">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 43 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.5 11.3333C30.4056 11.3333 37.625 9.43052 37.625 7.08331C37.625 4.7361 30.4056 2.83331 21.5 2.83331C12.5944 2.83331 5.375 4.7361 5.375 7.08331C5.375 9.43052 12.5944 11.3333 21.5 11.3333Z"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M37.625 17C37.625 19.3517 30.4583 21.25 21.5 21.25C12.5417 21.25 5.375 19.3517 5.375 17"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.375 7.08331V26.9166C5.375 29.2683 12.5417 31.1666 21.5 31.1666C30.4583 31.1666 37.625 29.2683 37.625 26.9166V7.08331"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <Link
                    className={`block py-2 px-2   ${
                      isMenuOpen ? "text-[#FFC30D]" : "text-[#9A9A9A]"
                    }  transition duration-500  rounded-sm hover:text-[#FFC30D]`}
                  >
                    Master Data
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
                        Company
                      </Link>
                    </li>
                    <li>
                      <Link to="currency" className="py-2 hover:text-[#62D64F]">
                        Currency
                      </Link>
                    </li>
                    <li>
                      <Link className="py-2 hover:text-[#62D64F]" to="country">
                        Country
                      </Link>
                    </li>
                    <li>
                      <Link to="province" className="py-2 hover:text-[#62D64F]">
                        Province
                      </Link>
                    </li>
                    <li>
                      <Link to="city" className="py-2 hover:text-[#62D64F]">
                        City
                      </Link>
                    </li>
                  </ul>
                ) : (
                  ""
                )}
              </li>
              <li className="group flex items-center  space-x-1">
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
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
