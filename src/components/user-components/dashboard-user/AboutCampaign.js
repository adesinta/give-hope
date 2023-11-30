import React from "react";
import loveHug from "../../../assets/img/lovehug.svg";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../config/api";
import DonateModalUser from "./DonateModalUser";
import moment from "moment/moment";

const AboutCampaign = () => {
  const [dataCampaigns, setDataCampaigns] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [idCampaign, setIdCampaign] = useState(0);
  const [idUser, setIdUser] = useState(0);
  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    document.title = "About Campaign"
  }, [])

  useEffect(() => {
    api
      .get(`/campaign/${id}`)
      .then((response) => {
        console.log(response?.data);
        setDataCampaigns(response?.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error?.dataCampaigns);
      });
  }, []);

  useEffect(() => {
    setIdUser(localStorage.getItem("iduser"));
  }, []);
  console.log(idUser);

  let progress = `${
    (dataCampaigns?.current_donation / dataCampaigns?.target) * 100
  }`;
  console.log(Math.round(progress) >= 100);
  if (Math.round(progress) >= 100) {
    progress = 100;
  }
  console.log(progress);

  const handleImageLoad = (event) => {
    const img = event.target;
    const width = img.naturalWidth;
    const height = img.naturalHeight;

    img.setAttribute("width", width);
    img.setAttribute("height", height);
  };

  return (
    <div className="bg-[#F7F0FF] h-screen">
      <div className="px-3 py-1 flex fixed top-0 left-0 right-0 ">
        <Link to="/dashboarduser">
          <h1 className="text-[#87255B] font-semibold text-[24px]">GiveHope</h1>
        </Link>
      </div>
      <div className="">
        <h1 className="font-bold text-center text-3xl py-10 text-[#87255B]">
          About Campaign
        </h1>
        {dataCampaigns ? (
          <div>
            <div className="flex justify-center">
            <img onLoad={handleImageLoad}
                  className="w-[40rem] object-cover shadow-2xl p-5 rounded-2xl"
                  src={`data:image/png;base64,${dataCampaigns?.image_base64}`}
                  alt="about donation"
                />
            </div>
            <div className="p-6 text-[#87255B]">
              <h1 className="text-2xl font-semibold mb-6">
                {dataCampaigns?.title}
              </h1>
              <div className="flex justify-between pr-4">
                <h1 className="font-semibold">
                  Rp. {dataCampaigns?.current_donation}
                </h1>
                <p className="font-semibold">
                  {moment(dataCampaigns?.target_date).format(
                    "dddd, DD MMMM YYYY"
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <p className="font-thin">Collected From </p>
                <h1 className="font-semibold">Rp. {dataCampaigns?.target} </h1>
              </div>
              <div className=" w-full p-1 relative  bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className={`bg-[#87255B] text-xs font-medium text-black text-center py-2 leading-none rounded-full`}
                  style={{ width: `${progress}%` }}
                ></div>
                <p className="absolute top-0 left-0 right-0 w-full flex  text-[#ca8fc7] font-semibold justify-center">
                  {`${progress}%`}
                </p>
              </div>
              <h1 className="pt-8 font-semibold">More about the campaign</h1>
              <p className="font-thin break-all whitespace-pre-line">
                {dataCampaigns?.content}
              </p>

              <button
                onClick={() => {
                  setOpenModal(true);
                  setIdCampaign(dataCampaigns?.id);
                }}
                className="mt-10 py-3  bg-[#87255B] text-white rounded-[10px] w-full  hover:bg-[#ac2c73]"
              >
                Donate
              </button>
              {openModal ? (
              <DonateModalUser
                openModal={openModal}
                setOpenModal={setOpenModal}
                idUser={idUser}
                idCampaign={idCampaign}
              />
            ) : null}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default AboutCampaign;
