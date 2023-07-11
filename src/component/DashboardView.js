import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const DashboardView = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <div className="p-4">
      <h1>Welcome, {userInfo.username}</h1>
    </div>
  );
};

export default DashboardView;