import { Link, NavLink, useNavigate } from "react-router-dom";
import dashboardIcon from "../../../assets/icons/dashboard.svg";
import logoutIcon from "../../../assets/icons/logout.svg";
import historyIcon from "../../../assets/icons/history.svg"
import { api } from "../../../config/api";
import { clearAccessTokenCookie, getAccessTokenCookie } from "../../../utils/cookie";

const UserSidebar = () => {
  const navigate = useNavigate();
  const dataUserSidebar = [
    {
      id: 1,
      icon_url: dashboardIcon,
      name: "Dashboard",
      navigate_url: "/dashboarduser",
    },
    {
      id: 2,
      icon_url: historyIcon,
      name: "History",
      navigate_url: "/history",
    },
    // {
    //   id: 3,
    //   icon_url: bellIcon,
    //   name: "Notification",
    //   navigate_url: "/message",
    // },
  ];

  const handleFetchLogout = () => {
    const result = window.confirm("Are u sure want to logout?");
  if (result) {
    const token = getAccessTokenCookie();
    api
      .post("/logout", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response);
        alert("Logout Success");
        clearAccessTokenCookie(response.message);
        navigate("/loginuser");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  };
  return (
    <div className="px-8 py-10 h-screen flex flex-col justify-between sticky  top-0 shadow-md">
      <div className="flex flex-col gap-10">
        <h1 className="text-[36px] text-[#87255B] font-bold text-center">
          GiveHope
        </h1>
        <div className="flex flex-col gap-8">
          {dataUserSidebar.map(({ icon_url, id, name, navigate_url }) => (
            <NavLink to={navigate_url} className="outline-none">
              {({ isActive, isPending }) => (
                <div
                  className={`${
                    isActive
                      ? "bg-gradient-to-r from-[#B370B0] to-[#F2FFFC]"
                      : ""
                  } flex gap-5 p-5 rounded-[10px] hover:bg-purple-50`}
                >
                  <img src={icon_url} alt="" />
                  <p className="text-[#87255B] font-medium">{name}</p>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      <button onClick={handleFetchLogout} className="flex gap-5 p-5 rounded-[10px] hover:bg-gradient-to-tr w-56 hover:bg-purple-50 outline-none">
        <img src={logoutIcon} alt="" />
        <p className="text-[#87255B] font-medium">Logout</p>
      </button>
    </div>
  );
};

export default UserSidebar;
