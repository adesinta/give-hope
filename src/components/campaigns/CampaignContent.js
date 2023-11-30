import { useEffect } from "react";
import Sidebar from "../global-component/Sidebar";
import CampaignContainer from "./CampaignContainer";

const CampaignContent = () => {
  useEffect(() => {
    document.title = "Campaign"
  }, [])
  return (
    <div className="flex">
      <Sidebar />
      <CampaignContainer />
    </div>
  );
};

export default CampaignContent;
