import React from "react";
import bg from "../img/login-Illustration.png";
import logo from "../img/login-logo.png";
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo, userInfo } = useContext(UserContext);
  const user = {
    username,
    password,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      const json = await response.json();
      console.log(json);
      setRedirect(true);
      setUserInfo(json);
    }
  };

  if (redirect) {
    return <Navigate to="home"></Navigate>;
  }
  if (userInfo) {
    return <Navigate to="home"></Navigate>;
  }

  return (
    <div className="bg-[#EBEBEB] min-h-screen">
      <h1 className="text-center pt-10 mb-10 font-bold text-4xl">
        <span>IndoCanada</span> <br></br>
        <span className="text-[#FFC30D] block mt-3">Warehouse</span>
      </h1>
      <div className="flex p-5  justify-around items-center">
        <img src={bg} alt="background" className="max-w-lg"></img>
        <form
          className="flex flex-col items-center space-y-4"
          onSubmit={handleSubmit}
        >
          <img src={logo} alt="login-logo" className="w-[48px] h-[46px]"></img>
          <input
            className="border rounded-md h-9 text-center font-extrabold text-sm text-[#828282] drop-shadow-sm w-[250px]"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border bg-white rounded-md h-9 text-center font-extrabold text-sm text-[#828282] drop-shadow-sm w-[250px]"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="border bg-white rounded-md h-8 text-center font-extrabold text-sm text-[#828282] drop-shadow-sm w-[150px]"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
      <p className="absolute bottom-5 left-7 font-bold text-[#C6C6C6]">
        Copyright @ IndoCanada Warehouse
      </p>
    </div>
  );
};

export default Login;
