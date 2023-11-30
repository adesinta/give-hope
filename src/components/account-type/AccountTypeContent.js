import React from "react";
import adminIcon from "../../assets/icons/admin.svg";
import userIcon from "../../assets/icons/user.svg";
import twoPeople from "../../assets/img/twoPeople.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const AccountTypeContent = () => {
  useEffect(() => {
    document.title = "Choose Account"
  }, [])
  return (
    <div>
       <Link to={"/"}> <h1 className="text-[#87255B] font-semibold text-[20px] pt-40">
        GiveHope
      </h1></Link>
      <h1 className="text-[#87255B] text-center mt-20  font-semibold text-[24px]">
        Choose Your Account Type
      </h1>
      <div className="flex justify-center gap-20 mt-10">
        <div className="bg-[#F2E7ED] w-[14rem] border-[#87255B] rounded-lg outline outline-2 outline-[#87255B] hover:bg-[#dfaec9] ">
          <Link to="/login">
            <div className="flex justify-center">
              <img src={adminIcon} alt="" />
            </div>
            <h1 className="text-center text-[#87255B] font-semibold ">
              Admin Account
            </h1>
            <p className="text-center text-[#87255B]">For Admin Account</p>
          </Link>
        </div>

        <div className="bg-[#F2E7ED] w-[14rem] border-[#87255B] flex-col rounded-lg outline outline-2 outline-[#87255B] hover:bg-[#dfaec9] ">
          <Link to="/loginuser">
            <div className="flex justify-center">
              <img src={userIcon} alt="" />
            </div>
            <h1 className="text-center text-[#87255B] font-semibold">
              User Account
            </h1>
            <p className="text-center text-[#87255B]">For User Account</p>
          </Link>
        </div>
      </div>
      {/* <div className="flex justify-center">
        <button className="px-20 py-3 mt-10 bg-[#87255B] text-white rounded-[10px]">
          Next
        </button>
      </div> */}
    </div>
  );
};

export default AccountTypeContent;
