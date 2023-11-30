import React, { useEffect, useState } from "react";
import { api } from "../../../config/api";

const HistoryContainerUser = () => {
  const [donationHistory, setDonationHistory] = useState([]);
  const idUser = localStorage.getItem("iduser");
  console.log(idUser);

  useEffect(() => {
    api
      .get(`/users/history/${idUser}`)
      .then((response) => {
        console.log(response);
        setDonationHistory(response);
      })
      .catch((error) => {
        console.log(error);
        alert("No History yet");
      });
  }, []);

  return (
    <div className="w-full m-4">
      <div class="relative shadow-md sm:rounded-lg w-full ">
        <table class="w-full text-sm text-left text-[#251C1C] dark:text-gray-400">
          <thead class="text-base text-[#87255B] bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                No
              </th>
              <th scope="col" class="px-6 py-3">
                Title
              </th>
              <th scope="col" class="px-6 py-3">
                Total
              </th>
              <th scope="col" class="px-6 py-3">
                Date/Time
              </th>
            </tr>
          </thead>
          <tbody>
            {donationHistory?.map((data, index) => (
              <tr>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{data.title}</td>
                <td className="px-6 py-4">{data.total}</td>
                <td className="px-6 py-4">{data.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryContainerUser;
