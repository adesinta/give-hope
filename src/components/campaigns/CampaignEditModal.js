import React from "react";
import EditModal from "../global-component/EditModal";
import { useState, useEffect } from "react";
import { api } from "../../config/api";

const CampaignEditModal = ({ openEditModal, setOpenEditModal, idCampaign }) => {
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(0);
  const [content, setContent] = useState("");
  const [targetDate, setTargetDate] = useState(0);
  const [currentDonation, setCurrentDonation] = useState(0);
  const [dataCampaigns, setDataCampaigns] = useState(null);
  const [data, setData] = useState({
    title: "",
    target: "",
    target_date: ""

  });
  console.log(dataCampaigns?.title);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("test")
    const data = {
      // id: id,
      title: dataCampaigns?.title,
      content:  dataCampaigns?.content,
      target: Number(dataCampaigns?.target),
      target_date: dataCampaigns?.target_date.toString(),
      current_donation: Number(dataCampaigns?.current_donation)
    };
    api
    .put(`/update/campaign/${idCampaign}`, data)
    .then((response) => {
      console.log(response);
      alert("Successfully Update");
      // setCampaign([...campaign, response.data]);
    })
    .catch((error) => {
      console.log(error);
      alert(error.data);
    });
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

  console.log(dataCampaigns?.current_donation)

  return (
    <EditModal>
      <div className="flex flex-col items-center">
        <h2 className="font-semibold text-[#87255B] text-[28px]">
          Edit Campaign
        </h2>
        <form onSubmit={handleSubmit} action="" className="w-full flex flex-col gap-5">
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
              type="text"
              name="name"
              value={dataCampaigns?.title || ""}
              className="outline-none border-2 border-[#BEBEBE] rounded-md px-5 py-3 text-xs text-gray-600"
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
              type="date"
              name="day target"
              min={new Date().toISOString().split("T")[0]}
              value={dataCampaigns?.target_date || ""}
              className="outline-none border-2 border-[#BEBEBE] rounded-md px-5 py-3 text-xs text-gray-600"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm" htmlFor="target">
              Current Donation
            </label>
            <input
                onChange={(event) => {
                  setDataCampaigns({
                    ...dataCampaigns,
                    current_donation: event.target.value,
                  });
                }}
              type="text"
              name="current donation"
              value={dataCampaigns?.current_donation || ""}
              className="outline-none border-2 border-[#BEBEBE] rounded-md px-5 py-3 text-xs text-gray-600"
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
              name="description"
              value={dataCampaigns?.content || ""}
              className="outline-none border-2 border-[#BEBEBE] rounded-md px-5 py-3 text-xs text-gray-600 resize-none hover:resize-y h-36"
            />
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
        <div className="flex gap-5 my-5">
          <button
            onClick={() => setOpenEditModal(false)}
            className="px-8 py-3 bg-[#328AAF] hover:bg-[#28789a] text-white rounded-full drop-shadow-lg outline-none transition-all duration-200 ease-out"
          >
            Cancel
          </button>
          <button type="submit" className="px-12 py-3 bg-[#87255B] hover:bg-[#792152] text-white rounded-full drop-shadow-lg outline-none transition-all duration-200 ease-out">
            Update
          </button>
        </div>
        </form>
      </div>
    </EditModal>
  );
};

export default CampaignEditModal;
