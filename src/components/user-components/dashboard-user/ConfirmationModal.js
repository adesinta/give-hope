import Modal from "../../global-component/Modal";
import { useState, useEffect } from "react";
import { api } from "../../../config/api";

const ConfirmationModal = ({ openModal, setOpenModal, idUser, idCampaign, total }) => {
//   const [total, setTotal] = useState(0);
  const [donate, setDonate] = useState([]);
  // const [successDonation, setSuccessDonation] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      campaign_id: idCampaign,
      total: parseInt(total),
      id_user: Number(idUser),
    };
    api
      .post("/donations", data)
      .then((response) => {
        console.log(response);
        alert("Donation Successfull");
        setDonate([...donate, response.data]);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert(error.data);
      });
  };
  return (
    <Modal>
        <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col gap-6 items-center text-center ">
            <h1 className="text-4xl text-gray-800 font-medium">Are you sure want to donate <span className="font-semibold">Rp.{total}</span> ?</h1>
            <p className="text-gray-600">Join me in making a positive impact! Every small contribution counts and together we can make a difference. In this challenging world, it's crucial to lend a helping hand to those in need. </p>
        </div>
        <div className="flex gap-4">
      <button
        onClick={() => setOpenModal(false)}
        className="px-8 py-3 bg-[#328AAF] hover:bg-[#28789a] text-white rounded-full drop-shadow-lg outline-none transition-all duration-200 ease-out"
      >
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        className="px-12 py-3 bg-[#87255B] hover:bg-[#792152] text-white rounded-full drop-shadow-lg outline-none transition-all duration-200 ease-out"
      >
        Okay
      </button>
      </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
