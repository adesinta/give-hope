import { Link, useNavigate } from "react-router-dom";
import inFrontOfComputer from "../assets/img/img-computer.svg";
import padLock from "../assets/icons/padlock.svg";
import emaill from "../assets/icons/emailGrey.svg";
import personn from "../assets/icons/person.svg";
import { useState } from "react";
import { api } from "../config/api";
import { useEffect } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  useEffect(() => {
    document.title = "Register"
  }, [])
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
      email: email,
      confirmPassword: confirmPass
    };

    api
      .post("/register", data)
      .then((response) => {
        console.log(response);
        alert(response.message);
        navigate("/loginuser");

      })
      .catch((error) => {
        console.log(error);
        alert(error.data.message);
      });
  };
  return (
    <div className="bg-[#F7F0FF] h-screen">
      <Link to={"/"}>
        {" "}
        <h1 className="text-[#87255B] font-bold text-[24px] p-5">GiveHope</h1>
      </Link>
      <div className="flex justify-around">
        <div className="">
          <div className="pt-10">
            <h1 className="text-[#87255B] font-poppins font-medium text-[30px] ">
              Create Account
            </h1>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="pt-12 w-[30rem]">
              <div className="flex gap-2 ">
                <img src={personn} alt="" />
                <input onChange={(event) => {
                  setUsername(event.target.value);
                }}
                  className="bg-transparent outline-0 w-full"
                  type="text"
                  placeholder="Enter your name" required
                />
              </div>
              <hr className="mt-2 border-[#87255B]" />
            </div>
            <div className="pt-10 w-[30rem]">
              <div className="flex gap-2 ">
                <img src={emaill} alt="" />
                <input onChange={(event) => {
                  setEmail(event.target.value);
                }}
                  className="bg-transparent outline-0 w-full"
                  type="email"
                  placeholder="Enter your email" required
                />
              </div>
              <hr className="mt-2 border-[#87255B]" />
            </div>
            <div className="pt-10 w-[30rem]">
              <div className="flex gap-2 ">
                <img src={padLock} alt="" />
                <input onChange={(event) => {
                  setPassword(event.target.value);
                }}
                  className="bg-transparent outline-0 w-full"
                  type="password"
                  placeholder="Enter your password" required
                />
              </div>
              <hr className="mt-2 border-[#87255B]" />
            </div>
            <div className="pt-10 w-[30rem]">
              <div className="flex gap-2 ">
                <img src={padLock} alt="" />
                <input onChange={(event) => {
                  setConfirmPass(event.target.value);
                }}
                  className="bg-transparent outline-0 w-full"
                  type="password"
                  placeholder="Confirm your password" required
                />
              </div>
              <hr className="mt-2 border-[#87255B]" />
            </div>
            <div className="pt-5 w-[30rem]">
                <button type="submit" className="mt-5 py-3 bg-[#87255B] text-white rounded-[10px] w-[30rem] hover:bg-[#ac2c73]">
                  Sign Up
                </button>
              
              <p className="pt-2 text-center text-[#B4B2B2]">
                Already have an account?{" "}
                <span className="text-[#87255B]">
                  <Link to={"/loginuser"}>Login here</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
        <img className="pt-20" src={inFrontOfComputer} alt="" />
      </div>
    </div>
  );
};

export default Register;
