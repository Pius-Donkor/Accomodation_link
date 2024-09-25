import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import SwiperArrowButtons from "./SwiperArrowButtons";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function RegularCarousel({ property }) {
  return (
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
  );
}
