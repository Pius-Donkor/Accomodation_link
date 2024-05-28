import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoBedOutline } from "react-icons/io5";
import { LuBath } from "react-icons/lu";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { FaCommentDots } from "react-icons/fa";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperArrowButtons from "../../UI/SwiperArrowButtons";
import Button from "../../UI/Button";

export default function PropertiesCard({ property }) {
  const [liked, setLiked] = useState(false);
  const [tempLiked, setTempLiked] = useState(false);

  return (
    <div className="flex h-[38rem] w-[22rem] flex-col items-center gap-4 rounded-md border-2 border-solid border-slate-200 bg-[#f9faff] p-4 shadow-xl md:w-[70%] lg:w-[22rem]">
      <div className="relative h-[50%] w-[100%] rounded-md bg-slate-500">
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{ clickable: true }}
          navigation={false}
          loop={true} // Ensure loop is set to true
          className="h-[100%] w-[100%] rounded-md bg-slate-400"
          spaceBetween={0}
          slidesPerView={1}
        >
          <SwiperArrowButtons />
          {property.image.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                className="h-[100%] w-[100%]"
                src={img}
                alt={`carousel_picture_${i}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* Card details */}
      <div className="flex w-[100%] flex-col gap-3">
        <div className="flex w-[100%] justify-between">
          <h1 className="text-xl font-bold md:text-3xl lg:text-lg">
            {property.name}
          </h1>
          <p className="text-xl font-bold md:text-3xl lg:text-lg">
            {property.price}
          </p>
        </div>
        <div className="flex justify-center gap-8">
          <span className="flex items-center justify-center gap-1 rounded-3xl bg-[#e3f5e3] p-2 md:text-2xl lg:text-base">
            <IoBedOutline />
            {property.bedrooms}
          </span>
          <span className="flex items-center justify-center gap-1 rounded-3xl bg-[#e3f5e3] p-2 md:text-2xl lg:text-base">
            <LuBath />
            {property.bathrooms}
          </span>
          <span className="flex items-center justify-center gap-1 rounded-3xl bg-[#e3f5e3] p-2 md:text-2xl lg:text-base">
            Size: {property.size}
          </span>
        </div>
        <div className="flex justify-center gap-12">
          <button className="rounded-3xl bg-[#f5e3e9] px-2 py-[0.1rem] text-lg text-[#b33479] shadow-md md:px-3 md:text-2xl lg:px-[0.6rem] lg:text-lg">
            <FaCommentDots />
          </button>
          <span
            onMouseEnter={() => setTempLiked(!tempLiked)}
            onMouseLeave={() => setTempLiked(!tempLiked)}
            onClick={() => setLiked(!liked)}
            className="flex items-center justify-center gap-1 rounded-3xl bg-[#f5e3e9] p-2 transition-all"
          >
            {liked || tempLiked ? (
              <IoHeart className="cursor-pointer text-xl text-[#b33479] transition-all md:text-3xl lg:text-xl" />
            ) : (
              <IoMdHeartEmpty className="cursor-pointer text-xl text-[#b33479] transition-all md:text-3xl lg:text-xl" />
            )}
          </span>
          <p className="flex items-center justify-center gap-1 rounded-3xl bg-[#e3f5e3] px-2 py-[0.1rem] text-lg md:text-2xl lg:text-base">
            ⭐{property.rating}
          </p>
        </div>
        <span className="flex items-center justify-center gap-1 overflow-hidden rounded-3xl bg-[#e3f5e3] p-2">
          <CiLocationOn className="text-xl text-[#0d291c] md:text-2xl lg:text-xl" />
          <span className="w-[100%] overflow-hidden text-ellipsis text-nowrap">
            {property.location}
          </span>
        </span>
        <div className="self-center">
          <Button type="transparent" link={`propertyDetails/${property.id}`}>
            View Listing
          </Button>
        </div>
      </div>
    </div>
  );
}
