import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CampaignContent from "./components/campaigns/CampaignContent";
import Accounttype from "./pages/Accounttype";
import DashboardUser from "./pages/DashboardUser";
import LoginUser from "./pages/LoginUser";
import History from "./components/user-components/History/History";
import DashboardCampaignContent from "./components/dashboard/campaign-content/DashboardCampaignContent";
import AboutCampaign from "./components/user-components/dashboard-user/AboutCampaign";

function App() {
  return (
    <div className="font-poppins">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/campaign" element={<CampaignContent />} />
          <Route path="/accounttype" element={<Accounttype />} />
          <Route path="/dashboarduser" element={<DashboardUser />} />
          <Route path="/loginuser" element={<LoginUser />} />
          <Route path="/history" element={<History />} />
          <Route path="/dashboardcampaign/:id" element={<DashboardCampaignContent />} />
          <Route path="/aboutcampaign/:id" element={<AboutCampaign />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
