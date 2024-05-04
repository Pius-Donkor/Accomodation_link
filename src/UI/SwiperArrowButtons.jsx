import React from "react";
import { useSwiper } from "swiper/react";

import { MdOutlineArrowCircleLeft } from "react-icons/md";
import { MdOutlineArrowCircleRight } from "react-icons/md";
export default function SwiperArrowButtons() {
  const swiper = useSwiper();
  function swipeLeft() {
    return swiper.slidePrev();
  }
  function swipeRight() {
    return swiper.slideNext();
  }
  return (
    <div className=" absolute top-[38%] z-10 flex w-[100%] justify-between  p-2 ">
      <span role="button" onClick={() => swipeLeft()}>
        <MdOutlineArrowCircleLeft
          role="button"
          className=" -z-10 rounded-full bg-[#ffffffbe] p-1 text-4xl transition-all hover:scale-125"
        />
      </span>
      <span role="button" onClick={() => swipeRight()}>
        <MdOutlineArrowCircleRight
          role="button"
          className=" -z-10 rounded-full bg-[#ffffffbe] p-1 text-4xl transition-all hover:scale-125"
        />
      </span>
    </div>
  );
}
