import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const DashboardView = () => {
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;

  return (
    <div className="p-4">
      <h1>Welcome, {username}</h1>
    </div>
  );
};

export default DashboardView;