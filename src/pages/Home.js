import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { TitleContext } from "../context/TitleContext";
import Sidebar from "../component/Sidebar";
import Menu from "../component/Menu";
const Home = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const { setTitle } = useContext(TitleContext);
  const username = userInfo?.username;
  const nav = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/api/users/profile", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
      });
  }, []);

  useEffect(() => {
    setTitle("Inventory Detail");
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function handleSidebarToggle() {
    setIsSidebarOpen(!isSidebarOpen);
  }

  if (!username) {
    nav("/");
  }

  return (
    <>
      <div className="md:flex relative ">
        <Sidebar isOpen={isSidebarOpen}></Sidebar>
        <div className="w-full drop-shadow">
          <Menu handleClick={handleSidebarToggle}></Menu>
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Home;
