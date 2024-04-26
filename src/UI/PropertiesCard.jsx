import React from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/bundle";
import SwiperArrowButtons from "./SwiperArrowButtons";

export default function PropertiesCard() {
  return (
    <div className="h-[22rem] w-[18rem] rounded-md bg-[#f9faff] p-4 shadow-xl">
      <div className=" relative h-[60%] w-[100%] rounded-md bg-slate-500 ">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          pagination={true}
          className=" h-[100%] w-[100%] bg-slate-400"
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperArrowButtons />
          <SwiperSlide>
            <img
              className=" h-[100%] w-[100%]"
              src="/public/18b-min.jpeg"
              alt="carousel_picture"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className=" h-[100%] w-[100%]"
              src="/public/18a-min.jpeg"
              alt="carousel_picture"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className=" h-[100%] w-[100%]"
              src="/public/19a-min.jpeg"
              alt="carousel_picture"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className=" h-[100%] w-[100%]"
              src="/public/19b-min.jpeg"
              alt="carousel_picture"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      {/* swipper arrows */}
    </div>
  );
}
