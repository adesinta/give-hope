import React from "react";
import { Link } from "react-router-dom";
import peopleHeader from "../../assets/img/peoples-header.svg";

const Header = () => {
  return (
    <div id="home" className="p-5 flex justify-between items-center pt-24">
      <div className="flex flex-col gap-10 items-start">
        <h1 className="text-[#87255B] text-7xl font-semibold pt-8">
          Fundraising for the people and Causes you care
        </h1>
        <Link to="/accounttype">
          <button className="px-20 py-3 bg-[#87255B] text-white rounded-[10px]  hover:bg-[#ac2c73]">
            Donate
          </button>
        </Link>
      </div>
      <img src={peopleHeader} alt="" />
    </div>
  );
};

export default Header;
