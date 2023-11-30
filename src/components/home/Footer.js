import React from "react";
import phone from "../../assets/icons/phone.svg";
import email from "../../assets/icons/email.svg";
import location from "../../assets/icons/location.svg";
import socialMedia from "../../assets/icons/socialmedia.svg";
import playStore from "../../assets/img/playStore.svg";
import appStore from "../../assets/img/appStore.svg";

const Footer = () => {
  return (
    <>
    <div id="footer" className="flex px-5 py-10  ">
      <div className="flex flex-col gap-4 h-[200px]">
        <h1 className="font-semibold text-2xl">GiveHope</h1>
        <p className="max-w-lg">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Consequuntur, adipisci nemo accusamus reiciendis minus rem distinctio
          minima recusandae necessitatibus aliquam ex laboriosam et,doloribus
          dignissimos sunt sapiente voluptas. Ex, rerum!
        </p>
      </div>
      <div className="pl-40">
        <h1 className="px-5 font-semibold">Contact Us</h1>
        <div>
          <div className="flex px-5 py-5">
            <img src={phone} alt="" />
            <p className="pl-5">+62-8xxx-xxxx</p>
          </div>
          <div className="flex px-5">
            <img src={email} alt="" />
            <p className="pl-5">GiveHope@gmail.com</p>
          </div>
          <div className="flex px-6 py-5">
            <img src={location} alt="" />
            <p className="pl-6">Lagarutu Palu</p>
          </div>
        </div>
      </div>

      <div className="pl-20">
        <h1 className="font-semibold">Social Media</h1>
        <div className="py-5">
        <img src={socialMedia} alt="" />
        </div>
        <div className="py-5 flex flex-col gap-5"> 
        <img src={appStore} alt="" />
        <img src={playStore} alt="" />
        </div>
      </div>
    </div>
     <footer className="text-center">
     <p> Copyright © 2023 GiveHope | All rights reserved by  GiveHope </p></footer>
     </>
  );
};

export default Footer;
