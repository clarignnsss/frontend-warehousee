import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { TitleContext } from "../context/TitleContext";
import { Dropdown } from "flowbite-react";

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setUserInfo, userInfo } = useContext(UserContext);
  const { title, setTitle } = useContext(TitleContext);
  const username = userInfo?.username;

  const nav = useNavigate();
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const logout = () => {
    // evt.preventDefault();
    fetch("http://localhost:4000/api/users/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    nav("/");
  };

  return (
    <div className="bg-gray-100 flex justify-between items-center text-white  pr-3 md:py-3">
      <h1 className="text-[#2C4856] font-extrabold pl-4 text-xl">{title}</h1>
      <div className="flex items-center">
        <button
          type="button"
          id="hamburger"
          onClick={props.handleClick}
          className="focus:bg-[#D7D7D7] text-[#2C4856]  p-4 md:hidden"
        >
          <svg
            className="w-8 h-8 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="text-[#2C4856]">
          <Dropdown
            inline
            classNamePrefix="dropdown-button"
            label={
              <div className="relative flex items-center cursor-pointer">
                <svg
                  width="32"
                  height="34"
                  viewBox="0 0 39 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.7812 8.00008C24.7812 10.3933 22.4167 12.3334 19.5 12.3334C16.5833 12.3334 14.2188 10.3933 14.2188 8.00008C14.2188 5.60684 16.5833 3.66675 19.5 3.66675C22.4167 3.66675 24.7812 5.60684 24.7812 8.00008Z"
                    stroke="#1B1B1B"
                    stroke-width="1.5"
                  />
                  <path
                    d="M29.6562 22.6667C29.6562 24.1008 28.6665 25.4936 26.8349 26.5669C25.0058 27.6391 22.4164 28.3333 19.5 28.3333C16.5836 28.3333 13.9942 27.6391 12.165 26.5669C10.3336 25.4936 9.34375 24.1008 9.34375 22.6667C9.34375 21.2325 10.3336 19.8397 12.165 18.7664C13.9942 17.6943 16.5836 17 19.5 17C22.4164 17 25.0058 17.6943 26.8349 18.7664C28.6665 19.8397 29.6562 21.2325 29.6562 22.6667Z"
                    stroke="#1B1B1B"
                    stroke-width="1.5"
                  />
                </svg>
              </div>
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{username}</span>
            </Dropdown.Header>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Menu;
