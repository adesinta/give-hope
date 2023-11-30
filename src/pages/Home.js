import Header from "../components/home/Header";
import Navbar from "../components/home/Navbar";
import HeaderTwo from "../components/home/HeaderTwo";
import bgHeaderTwo from "../assets/img/bgHeaderTwoo.png";
import Tutorial from "../components/home/Tutorial";
import Footer from "../components/home/Footer";
import bgFooter from "../assets/img/bgFooter.png";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Landing Page"
  }, [])
  return (
    <>
      <div className=" bg-[#F7F0FF] h-screen">
        <div className="max-w-7xl m-auto">
          <Navbar />
          <Header />
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url(${bgHeaderTwo})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-7xl m-auto">
          <HeaderTwo />
        </div>
      </div>
      <div className="max-w-7xl m-auto h-screen">
        <Tutorial />
      </div>
      <div
      style={{
        backgroundImage: `url(${bgFooter})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      >
        <div className="max-w-7xl m-auto">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
