import React from "react";
import EditModal from "../global-component/EditModal";
import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { api } from "../../config/api";
import { getAccessTokenCookie, getAccessTokenCookieAdmin } from "../../utils/cookie";

const EditCampaignModal = ({ openEditModal, setOpenEditModal, idCampaign }) => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(0);
  const [content, setContent] = useState("");
  const [targetDate, setTargetDate] = useState(0);
  const [id, setId] = useState(0);
  const [currentDonation, setCurrentDonation] = useState(0);
  const [dataCampaigns, setDataCampaigns] = useState(null);
  const [nameImage, setNameImage] = useState("")
  const [imageFile, setImageFile] = useState(null);

  const cookieAdmin = Object.keys(Cookie.get())[0]?.includes("ADMIN");
  const cookieAdminName = getAccessTokenCookieAdmin();
  const cookieUserName = getAccessTokenCookie();

  const putDataCampaign = async () => {

    if (isNaN(dataCampaigns.target)) {
      alert("Please enter a valid number for the target");
      return;
    }

    const formData = new FormData();
    formData.append("id", dataCampaigns.id);
    formData.append("title", dataCampaigns?.title);
    formData.append("content", dataCampaigns?.content);
    formData.append("target", dataCampaigns?.target);
    formData.append("target_date", dataCampaigns?.target_date);
    formData.append("image_base64", imageFile);
    await fetch(`http://localhost:8000/update/campaign/${idCampaign}`, {
      method: "PUT",
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
        alert("Successfully Update Campaign");
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
    putDataCampaign(dataCampaigns); // Pass the updated data directly
  };

  useEffect(() => {
    api
      .get(`/campaign/${idCampaign}`)
      .then((response) => {
        console.log(response?.data);
        setDataCampaigns(response?.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error?.dataCampaigns);
      });
  }, []);

  return (
    <EditModal>
      <div className="flex flex-col items-center">
        <h2 className="font-semibold text-[#87255B] text-[28px]">
          Edit Campaign
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
                setDataCampaigns({
                  ...dataCampaigns,
                  title: event.target.value,
                });
              }}
              value={dataCampaigns?.title || ""}
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
                setDataCampaigns({
                  ...dataCampaigns,
                  target: event.target.value,
                });
              }}
              type="text"
              name="money target"
              value={dataCampaigns?.target || ""}
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
                setDataCampaigns({
                  ...dataCampaigns,
                  target_date: event.target.value,
                });
              }}
              value={dataCampaigns?.target_date || ""}
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
                setDataCampaigns({
                  ...dataCampaigns,
                  content: event.target.value,
                });
              }}
              value={dataCampaigns?.content || ""}
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
                  setImageFile(event.target.files[0]); // Update imageFile state directly
                  setNameImage(event.target.files[0]?.name);
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
          {/* <div className="flex flex-col gap-2">
          <span className="text-sm" htmlFor="file">File</span>
          <label className="outline-none border-2 border-[#BEBEBE] rounded-md">
            <input type="file" name="file" id="file" className="hidden" />
            <p className="text-center cursor-pointer hover:bg-slate-50 px-5 py-3">
              Choose file
            </p>
          </label>
        </div> */}
          <div className="flex justify-center gap-5 my-5">
            <button
              onClick={() => setOpenEditModal(false)}
              className="px-8 py-3 bg-[#328AAF] hover:bg-[#28789a] text-white rounded-full drop-shadow-lg outline-none transition-all duration-200 ease-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-12 py-3 bg-[#87255B] hover:bg-[#792152] text-white rounded-full drop-shadow-lg outline-none transition-all duration-200 ease-out"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </EditModal>
  );
};

export default EditCampaignModal;
