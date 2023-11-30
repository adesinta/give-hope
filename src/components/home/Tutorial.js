import tutorialHeader from "../../assets/img/tutorialpeople.svg";
import visitWebsite from "../../assets/icons/web.svg"
import fillForm from "../../assets/icons/fillform.svg"
import trueFalse from "../../assets/icons/truefalse.svg"
import { Link } from "react-router-dom";

const Tutorial = () => {
  return (
    <>
      <div id="tutorial" className="px-5 py-20 flex flex-col gap-4 h-[500px]">
        <h1 className=" text-[#87255B] text-3xl font-bold">
          How to raise funds
        </h1>

        <div className="flex justify-between">
          <div>
            <div className="py-5 flex">
              <img src={visitWebsite} alt=""/>
              <div className="p-5">
              <h1 className="font-semibold">Visit Website</h1>
              <p>Visit the GiveHope website for the information</p>
              </div>
            </div>

            <div className="flex">
              <img src={fillForm} alt=""/>
            <div className="p-5">
              <h1 className="font-semibold">Fill out the fundraising form</h1>
              <p>
                Fill out the form completely by following the <br /> instruction
                provided
              </p>
            </div>
            </div>

            <div className="flex">
            <img src={trueFalse} alt=""/>
            <div className="p-5">
              <h1 className="font-semibold">Waiting for confirmation</h1>
              <p>Wait for confirmation from the GiveHope team</p>
            </div>
            </div>
          </div>
          <img src={tutorialHeader} alt="" />
        </div>
      </div>
    </>
  );
};

export default Tutorial;
