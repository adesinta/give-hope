import Sidebar from "../global-component/Sidebar";
import DashboardContainer from "./DashboardContainer";
import AddCampaignModal from "./AddCampaignModal";
import { useEffect } from "react";

const DashboardContent = () => {
  useEffect(() => {
    document.title = "Dashboard Admin"
  }, [])
  return (
    <div className="flex">
      <Sidebar />
      <DashboardContainer />
      
    </div>
  );
};

export default DashboardContent;
