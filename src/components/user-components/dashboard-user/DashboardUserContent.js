import React from "react";
import UserSidebar from "../user-global-component/UserSidebar";
import UserContainerDashboard from "./UserContainerDashboard";
import { useEffect } from "react";

const DashboardUserContent = () => {
  useEffect(() => {
    document.title = "Dashboard"
  }, [])
  return (
    <div className="flex">
      <UserSidebar />
      <UserContainerDashboard/>
    </div>
  );
};

export default DashboardUserContent;
