import { Link, useNavigate } from "react-router-dom";
import googleLogo from "../assets/img/google.svg";
import peopleHeader from "../assets/img/peoples-header.svg";
import {AiFillEyeInvisible, AiFillEye} from 'react-icons/ai'
import { useState, useEffect } from "react";
import { api } from "../config/api";
import { getAccessTokenCookieAdmin,  setAccessTokenCookieAdmin } from "../utils/cookie";

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState (false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // handle toggle 
  const toggle = () => {
    setOpen(!open)
  }
 
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    api
      .post("/admin/login", data)
      .then((response) => {
        console.log(response);
        alert("Login Successfull");
        setAccessTokenCookieAdmin(response.token)
        window.location.replace("/dashboard")
      })
      .catch((error) => {
        console.log(error);
        alert(error.data.message);
      });
  };

  useEffect(() => {
    const token = getAccessTokenCookieAdmin()
    if(!token) {
      navigate("/login")
    } else {
      navigate("/dashboard")
    }
  },[])

  useEffect(() => {
    document.title = "Login Admin"
  }, [])

  return (
    <div className="bg-[#F7F0FF] h-screen">
     <Link to={"/"}> <h1  className="text-[#87255B] font-bold text-[24px] p-5">GiveHope</h1></Link>
      <div className="flex justify-around">
        <div className="">
          <div className="py-16">
            <h1 className="text-[#87255B] font-poppins font-medium text-[30px] ">
              Login Admin
            </h1>
            <p>Welcome Back</p>
          </div>

        <form action="" onSubmit={handleSubmit}>
          <div className="w-[30rem]">
            <input onChange={(event) => {
                  setUsername(event.target.value);
                }}
              className="bg-transparent outline-0 w-full"
              type="text"
              placeholder="Username"
            />
            <hr className="mt-2 border-[#87255B]" />
          </div>
          <div className="pt-10 w-[30rem]">
            <div className="flex justify-between">
            <input onChange={(event) => {
                  setPassword(event.target.value);
                }}
              className="bg-transparent outline-0 w-full"
              type={(open === false)? 'password' : 'text'}
              placeholder="Password"    required
            />
            {
              (open === false)? <AiFillEye onClick={toggle}/>: <AiFillEyeInvisible onClick={toggle}/>
            }
            </div>
            <hr className="mt-2 border-[#87255B]" />
            {/* <p className="underline pt-2 text-end text-[#87255B] font-semibold">
              Forgot password
            </p> */}
              <button type="submit" className="mt-10 py-3 bg-[#87255B] text-white rounded-[10px] w-[30rem]  hover:bg-[#ac2c73]">
                Log in
              </button>
            
          </div>
          </form>
        </div>
        {/* <img className="pt-20" src={peopleHeader} alt="" /> */}
      </div>
    </div>
  );
};

export default Login;
