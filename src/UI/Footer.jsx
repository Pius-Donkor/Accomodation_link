import React from "react";
import Logo from "./Logo";
import { FiTwitter } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className=" flex justify-center bg-[#bbd2e7] px-14  ">
      <div className=" flex items-center gap-4 p-5">
        <Logo type="big" text={"none"} />
        <div className="flex flex-col  items-center gap-4">
          <h1 className=" text-3xl font-bold ">AccommodationLink</h1>
          <span className=" text-lg">
            Find your suitable rent<sup>TM</sup>
          </span>
          <span className=" text-lg"> @ 2024 AccommodationLink.Inc</span>
          <div className=" flex  gap-2 ">
            <span>
              <FiTwitter className=" rounded-full bg-[#ffffff79] p-1 text-4xl " />
            </span>
            <span>
              <FaFacebook className=" rounded-full bg-[#ffffff79] p-1 text-4xl " />
            </span>
            <span>
              <IoLogoInstagram className=" rounded-full bg-[#ffffff79] p-1 text-4xl " />
            </span>
            <span>
              <FaWhatsapp className=" rounded-full bg-[#ffffff79] p-1 text-4xl " />
            </span>
          </div>
        </div>
      </div>
      <div className=" flex items-center gap-4 p-5">
        <h1 className=" text-2xl font-bold ">Developed by:</h1>
      </div>
    </footer>
  );
}
