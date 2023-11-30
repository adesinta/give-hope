import Modal from "../global-component/Modal";
import { useState, useEffect } from "react";
import { api } from "../../config/api";
import Cookie from "js-cookie";
import {
  getAccessTokenCookie,
  getAccessTokenCookieAdmin,
} from "../../utils/cookie";

const AddCampaignModal = ({ openModal, setOpenModal }) => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(0);
  const [content, setContent] = useState("");
  const [targetDate, setTargetDate] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [id, setId] = useState(0);
  const [currentDonation, setCurrentDonation] = useState(0);
  const [campaign, setCampaign] = useState([]);
  const [nameImage, setNameImage] = useState("")

  const cookieAdmin = Object.keys(Cookie.get())[0]?.includes("ADMIN");
  const cookieAdminName = getAccessTokenCookieAdmin();
  const cookieUserName = getAccessTokenCookie();

  const postDataCampaign = async () => {

    if (isNaN(target)) {
      alert("Please enter a valid number for the target");
      return;
    }
    
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("target", target);
    formData.append("target_date", targetDate);
    formData.append("image_base64", imageFile);
    await fetch("http://localhost:8000/campaign", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: !!cookieAdmin ? cookieAdminName : cookieUserName,
        Accept: "application/json",
      },
    })
      .then((response) => {
        response.json();
        console.log(response);
      })
      .then((result) => {
        alert("Successfully Add Campaign");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleReader = (event) => {
    console.log(event);
    let binaryString = event.target.result;
    setImageFile(btoa(binaryString));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    postDataCampaign();
  };
  return (
    <Modal>
      <div className="flex flex-col items-center">
        <h2 className="font-semibold text-[#87255B] text-[28px]">
          Add Campaign
        </h2>
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-5"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="name">
              Title
            </label>
            <input
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              type="text"
              name="name"
              className="outline-none border-2 border-[#BEBEBE] rounded-md px-5 py-3 text-xs text-gray-600"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="target">
              Money Targets
            </label>
            <input
              onChange={(event) => {
                setTarget(event.target.value);
              }}
              type="text"
              name="money target"
              className="outline-none border-2 border-[#BEBEBE] rounded-md px-5 py-3 text-xs text-gray-600"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="target">
              Day Targets
            </label>
            <input
              onChange={(event) => {
                setTargetDate(event.target.value);
              }}
              type="date"
              name="day target"
              min={new Date().toISOString().split("T")[0]}
              className="outline-none border-2 border-[#BEBEBE] rounded-md px-5 py-3 text-xs text-gray-600"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="description">
              Description
            </label>
            <textarea
              onChange={(event) => {
                setContent(event.target.value);
              }}
              name="description"
              className="outline-none border-2 border-[#BEBEBE] rounded-md px-5 py-3 text-xs text-gray-600 resize-none hover:resize-y h-36"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex">
            <span className="text-sm" htmlFor="file">
              File
            </span>
            <p className="text-xs text-red-700 ml-5 ">*max 10mb</p>
            </div>
            <label className="outline-none border-2 border-[#BEBEBE] rounded-md">
              <input
                onChange={(event) => {
                  setImageFile(event.target.files[0]);
                  setNameImage(event.target.files[0].name)
                  
                }}
                type="file"
                accept=".jpeg, .jpg, .png"
                name="file"
                id="file"
                className="hidden"
              />
              <p className="text-center cursor-pointer hover:bg-slate-50 px-5 py-3">
                {!!nameImage ? nameImage : "Choose File"}
              </p>
            </label>
          </div>
          <div className="flex justify-center gap-5 ">
            <button
              onClick={() => setOpenModal(false)}
              className="px-8 py-3 bg-[#328AAF] hover:bg-[#28789a] text-white rounded-full drop-shadow-lg outline-none transition-all duration-200 ease-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-12 py-3 bg-[#87255B] hover:bg-[#792152] text-white rounded-full drop-shadow-lg outline-none transition-all duration-200 ease-out"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCampaignModal;
