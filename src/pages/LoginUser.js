import { Link, useNavigate } from "react-router-dom";
import peopleHeader from "../assets/img/peoples-header.svg";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState, useEffect } from "react";
import { api } from "../config/api";
import { getAccessTokenCookie, setAccessTokenCookie } from "../utils/cookie";

const LoginUser = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [idForStorage, setIdForStorage] = useState("");
  const [userNameForStorage, setUserNameForStorage] = useState("");

  // handle toggle
  const toggle = () => {
    setOpen(!open);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { 
      username: username,
      password: password,
    };
    api
      .post("/login", data)
      .then((response) => {
        alert("Login Successfull");
        setAccessTokenCookie(response.data.token);
        window.location.replace("/dashboarduser");
        localStorage.setItem("iduser", response.data.id);
        localStorage.setItem("username", response.data.username);
        console.log(response);
        console.log(response.data.id);
        console.log(response.data.username);
        setIdForStorage(response.data.id);
        setUserNameForStorage(response.data.username);
      })
      .catch((error) => {
        console.log(error);
        alert(error.data.message);
      });
  };

  useEffect(() => {
    const token = getAccessTokenCookie();
    if (!token) {
      navigate("/loginuser");
    } else {
      navigate("/dashboarduser");
    }
  }, []);

  useEffect(() => {
    document.title = "Login"
  }, [])

  return (
    <div className="bg-[#F7F0FF] h-screen">
      <Link to={"/"}>
        <h1 className="text-[#87255B] font-bold text-[24px] p-5">GiveHope</h1>
      </Link>
      <div className="flex justify-around">
        <div className="">
          <div className="py-16">
            <h1 className="text-[#87255B] font-poppins font-medium text-[30px] ">
              Let's Donate
            </h1>
            <p>with GiveHope</p>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <div className="">
              <input
                onChange={(event) => {
                  setUsername(event.target.value);
                  setUserNameForStorage(event.target.value);
                }}
                value={userNameForStorage}
                className="bg-transparent outline-0 w-full"
                type="text"
                placeholder="Enter your username"
                required
              />
              <hr className="mt-2 border-[#87255B]" />
            </div>
            <div className="pt-10 w-[30rem]">
              <div className="flex justify-between">
                <input
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className="bg-transparent outline-0 w-full"
                  type={open === false ? "password" : "text"}
                  placeholder="Enter your password"
                  required
                />
                {open === false ? (
                  <AiFillEye onClick={toggle} />
                ) : (
                  <AiFillEyeInvisible onClick={toggle} />
                )}
              </div>
              <hr className="mt-2 border-[#87255B]" />
              <p className="underline pt-2 text-end text-[#87255B] font-semibold">
                Forgot password
              </p>
              <button
                type="submit"
                className="mt-10 py-3 bg-[#87255B] text-white rounded-[10px] w-[30rem]  hover:bg-[#ac2c73]"
              >
                Log in
              </button>
              <p className="pt-2 text-center text-[#B4B2B2]">
                Don't have an account?{" "}
                <span className="text-[#87255B]">
                  <Link to={"/register"}>SignUp here</Link>
                </span>
              </p>
            </div>
          </form>
        </div>
        <img className="pt-20" src={peopleHeader} alt="" />
      </div>
    </div>
  );
};

export default LoginUser;
