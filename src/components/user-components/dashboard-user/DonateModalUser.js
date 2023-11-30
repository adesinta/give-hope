import Modal from "../../global-component/Modal";
import { useState, useEffect } from "react";
import { api } from "../../../config/api";
import ConfirmationModal from "./ConfirmationModal";

const DonateModalUser = ({ openModal, setOpenModal, idUser, idCampaign }) => {
  const [total, setTotal] = useState(0);
  const [donate, setDonate] = useState([]);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = {
  //     campaign_id: idCampaign,
  //     total: parseInt(total),
  //     id_user: Number(idUser),
  //   };
  //   api
  //     .post("/donations", data)
  //     .then((response) => {
  //       console.log(response);
  //       alert("Donation Successfull");
  //       setDonate([...donate, response.data]);

  //       })
  //     .catch((error) => {
  //       console.log(error);
  //       alert(error.data);
  //     });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenModalConfirmation(true);
  };

  return (
    <>
      <div>
        <Modal>
          <div className="flex flex-col items-center">
            <h2 className="font-semibold text-[#87255B] text-[28px]">
              Donate Campaign
            </h2>
            <form
              action=""
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-5"
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm" htmlFor="target">
                  Money Targets
                </label>
                <input
                  onChange={(event) => {
                    setTotal(event.target.value);
                  }}
                  type="text"
                  name="money target"
                  className="outline-none border-2 border-[#BEBEBE] rounded-md px-5 py-3 text-xs text-gray-600"
                />
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
                  Donate
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
      {openModalConfirmation && <ConfirmationModal total={total} openModal={openModalConfirmation} setOpenModal={setOpenModalConfirmation} idUser={idUser} idCampaign={idCampaign}/>}
    </>
  );
};

export default DonateModalUser;
