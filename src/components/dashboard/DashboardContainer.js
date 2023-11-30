import { useState, useEffect } from "react";
import loveHug from "../../assets/img/lovehug.svg";
import plusicon from "../../assets/icons/plusicon.svg";
import AddCampaignModal from "./AddCampaignModal";
import EditCampaignModal from "./EditCampaignModal";
import { DashboardSearch } from "./DashboardSearch";
import { Link } from "react-router-dom";
import { api } from "../../config/api";
import moment from "moment/moment";

const DashboardContainer = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(0);
  const [targetDate, setTargetDate] = useState(0);
  const [dataCampaigns, setDataCampaigns] = useState([]);
  const [dataFilter, setDataFilter] = useState(dataCampaigns);
  const [isLength, setIsLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPage, setLimitPage] = useState(5);
  const [idCampaign, setIdCampaign] = useState(0);

  const indexOfLastLimit = currentPage * limitPage;
  const indexOfFirstLimit = indexOfLastLimit - limitPage;

  let dataTest =
    dataFilter.length !== 0 && isLength !== 0 ? dataFilter : dataCampaigns;
  // console.log(dataTest);
  
  const handleSearchCampaign = (value) => {
    const dataFilter = dataCampaigns.filter((element) => {
      // console.log(element.data.title);

      return element.data.title.toLowerCase().includes(value.toLowerCase());
    });
    setIsLength(value.length);
    setDataFilter(dataFilter);
  };
  // console.log(dataFilter.length);
  // console.log(isLength);

  const currentData = dataTest.slice(indexOfFirstLimit, indexOfLastLimit);

  const nPages = Math.ceil(dataTest.length / limitPage);
  const pagesNumber = [...Array(nPages + 1).keys()].slice(1);
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

  useEffect(() => {
    api
      .get("/campaigns")
      .then((response) => {
        // console.log(response.message);
        setDataCampaigns(response.message);
      })
      .catch((error) => {
        // console.log(error);
        alert(error.dataCampaigns);
      });
  }, []);

  const handleImageLoad = (event) => {
    const img = event.target;
    const width = img.naturalWidth;
    const height = img.naturalHeight;

    img.setAttribute("width", width);
    img.setAttribute("height", height);
  };

  return (
    <div className="w-full p-4">
      <DashboardSearch
        onChange={(event) => handleSearchCampaign(event.target.value)}
      />
      <h1 className="text-[#87255B] font-semibold m-4">Open Donation</h1>
      {currentData?.map(({ data }) => {
        // console.log(data);
        let progress = `${(data?.current_donation / data?.target) * 100}`;
        // console.log(Math.round(progress) >= 100);
        if (Math.round(progress) >= 100) {
          progress = 100;
        }

        // console.log(progress);
        // console.log((data?.current_donation / data?.target) * 100);
        // console.log(typeof Number(`${Math.round(progress)}`));
        return (
          <div
            key={data.id}
            className="bg-[#727272] bg-blend-multiply bg-center rounded-[10px] shadow-2xl mb-4 p-4 w-full"
            style={{
              backgroundImage: `url(data:image/png;base64,${data.image_base64})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <Link to={`/dashboardcampaign/${data.id}`}>
              <div className="flex justify-between font-semibold ">
                <h1 className="text-2xl pb-20 text-[#EFE3FF] ">{data.title}</h1>
              </div>
              <div className="flex justify-between text-[#EFE3FF] ">
                <h1 className="font-semibold">Rp. {data.current_donation}</h1>
                <p className="font-semibold">
                  {moment(data.target_date).format("dddd, DD MMMM YYYY")}
                </p>
              </div>
              <div className="flex gap-2 text-[#EFE3FF] ">
                <p className="font-thin">Collected From </p>
                <h1 className="font-semibold">Rp. {data.target}</h1>
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
            </Link>
            <button
              onClick={() => {
                setOpenEditModal(true);
                setIdCampaign(data.id);
                // console.log(data.id);
              }}
              className="mt-2 px-10 py-2 bg-[#EFE3FF] text-[#87255B] font-semibold rounded-[20px] hover:bg-[#ffffff] "
            >
              edit
            </button>
            {openEditModal ? (
              <EditCampaignModal
                idCampaign={idCampaign}
                openEditModal={openEditModal}
                setOpenEditModal={setOpenEditModal}
              />
            ) : null}
          </div>
        );
      })}

      <div className="flex justify-center">
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
      <div
        onClick={() => setOpenModal(true)}
        className="flex justify-end  pr-5 "
      >
        <button className="hover:bg-[#EFE3FF] rounded-full">
          {" "}
          <img src={plusicon} alt="" />
        </button>
      </div>
      {openModal ? (
        <AddCampaignModal openModal={openModal} setOpenModal={setOpenModal} />
      ) : null}
    </div>
  );
};

export default DashboardContainer;
