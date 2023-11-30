import CampaignSearch from "./CampaignSearch";
import editIcon from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import plusicon from "../../assets/icons/plusicon.svg";
import React, { useState, useEffect } from "react";
import AddCampaignModal from "../dashboard/AddCampaignModal";
import { api } from "../../config/api";
import CampaignEditModal from "./CampaignEditModal";
import moment from "moment/moment";

const CampaignContainer = () => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [dataCampaigns, setDataCampaigns] = useState([]);
  const [dataFilter, setDataFilter] = useState(dataCampaigns);
  const [isLength, setIsLength] = useState(0);
  const [idCampaign, setIdCampaign] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPage, setLimitPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const indexOfLastLimit = currentPage * limitPage;
  const indexOfFirstLimit = indexOfLastLimit - limitPage;

  let dataTest =
    dataFilter?.length !== 0 && isLength !== 0 ? dataFilter : dataCampaigns;
  // console.log(dataTest);
  const handleSearchCampaign = (value) => {
    const dataFilter = dataCampaigns?.filter((element) => {
      // console.log(element.data.title);

      return element?.data?.title?.toLowerCase().includes(value.toLowerCase());
    });
    setIsLength(value?.length);
    setDataFilter(dataFilter);
  };

  const currentData = dataTest?.slice(indexOfFirstLimit, indexOfLastLimit);
  const nPages = Math.ceil(dataTest?.length / limitPage);
  const pagesNumber = [...Array(nPages + 1)?.keys()]?.slice(1);
  const nextPages = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPages = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteCampaign = (id) => {
    const result = window.confirm("Are u sure want to delete?");
    if (result) {
      api
        .delete(`/delete/campaign/${id}`)
        .then((response) => {
          console.log(response);
          alert(response.message);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const fetchData = async () => {
    setLoading(true);
    await api
      .get("/campaigns")
      .then((response) => {
        // console.log(response.message);
        setDataCampaigns(response.message);
      })
      .catch((error) => {
        // console.log(error);
        alert(error.dataCampaigns);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full m-4">
      <CampaignSearch
        onChange={(event) => handleSearchCampaign(event.target.value)}
      />
      {/* <div>
        <ul className="flex flex-wrap gap-8 text-[#87255B] font-semibold ">
          <button>
            <li className=" p-4 border-b-2 border-transparent  hover:text-[#E4820E] hover:border-[#E4820E]">
              All
            </li>
          </button>
          <button>
            <li className="p-4 border-b-2 border-transparent  hover:border-[#87255B]">
              Process
            </li>
          </button>
          <button className="p-4 border-b-2 border-transparent  hover:text-[#1C9A11] hover:border-[#1C9A11]">
              Done
          </button>
        </ul>
      </div> */}
      <div class="relative shadow-md sm:rounded-lg w-full mt-5">
        {loading ? (
          <div class="animate-pulse flex space-x-4 p-5">
            <div class="flex-1 space-y-6 py-1">
              <div class="space-y-5">
                {/* <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                </div> */}
                <div class="h-2 bg-slate-700 rounded"></div>
                <div class="h-2 bg-slate-700 rounded"></div>
                <div class="h-2 bg-slate-700 rounded"></div>
                <div class="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        ) : (
          <table class="w-full text-sm text-left text-[#251C1C] dark:text-gray-400">
            <thead class="text-base text-[#87255B] bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-5 py-3">
                  No
                </th>
                <th scope="col" class="px-5 py-3">
                  Title
                </th>
                <th scope="col" class="px-5 py-3">
                  Id Campaign
                </th>
                <th scope="col" class="px-5 py-3">
                  Money Target
                </th>
                <th scope="col" class="px-5 py-3">
                  Date Target
                </th>
                <th scope="col" class="px-5 py-3">
                  Total
                </th>
                <th scope="col" class="px-5 py-3">
                  Status
                </th>
                <th scope="col" class="px-5 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData?.map(({ data }, index) => (
                <tr class="bg-white border-b even:bg-purple-50 dark:bg-gray-900 dark:border-gray-700">
                  <td class="px-6 py-4">{index + 1}</td>
                  <td class="px-6 py-4">{data.title}</td>
                  <td class="px-6 py-4">{data.id}</td>
                  <td class="px-6 py-4">Rp. {data.target} </td>
                  <td class="px-6 py-4">
                    {moment(data.target_date).format("YYYY-MM-DD")}{" "}
                  </td>
                  <td class="px-6 py-4">Rp. {data.current_donation}</td>
                  <td class="px-6 py-4">{data.status}</td>
                  <td class="px-6 py-4">
                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          setOpenEditModal(true);
                          setIdCampaign(data.id);
                          console.log(data.id);
                        }}
                      >
                        <img src={editIcon} alt="" />
                      </button>
                      {openEditModal ? (
                        <CampaignEditModal
                          idCampaign={idCampaign}
                          openEditModal={openEditModal}
                          setOpenEditModal={setOpenEditModal}
                        />
                      ) : null}
                      <button
                        onClick={() => {
                          handleDeleteCampaign(data.id);
                        }}
                      >
                        <img src={deleteIcon} alt="" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="flex justify-center p-6">
        <nav aria-label="Page navigation example">
          <ul class="inline-flex -space-x-px">
            <li>
              <a
                href="#"
                onClick={prevPages}
                class="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-[#87255B] rounded-l-lg hover:bg-[#dfaec9] hover:text-[#87255B] dark:bg-gray-800 dark:border-[#87255B] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            {pagesNumber.map((pgNumber) => (
              <li>
                <a
                  href="#"
                  onClick={() => setCurrentPage(pgNumber)}
                  class="px-3 py-2 leading-tight text-gray-500 bg-white border border-[#87255B] hover:bg-[#dfaec9] hover:text-[#87255B] dark:bg-gray-800 dark:border-[#87255B] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {pgNumber}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                onClick={nextPages}
                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-[#87255B] rounded-r-lg hover:bg-[#dfaec9] hover:text-[#87255B] dark:bg-gray-800 dark:border-[#87255B] dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default CampaignContainer;
