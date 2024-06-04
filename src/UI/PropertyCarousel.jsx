import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useEffect, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
export default function PropertyCarousel({
  images,
  setScreenState = () => {},
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [isFullScreen, setIsFullScreen] = useState(false);
  const close = () => setIsFullScreen(false);
  const { ref } = useOutsideClick(close);

  useEffect(() => {
    setScreenState(isFullScreen);
  }, [isFullScreen]);

  function handleZoom() {
    setIsFullScreen(true);
  }
  const size = {
    normal: {
      overlay: "",
      cover: "",
      swiper: "mb-2 h-[20rem] md:h-[30rem]  flex-none lg:w-[40rem] w-full   ",
      thumbs: "w-[40rem]",
    },
    zoom: {
      overlay:
        " fixed left-0 top-[5rem] z-[1000] flex h-[100dvh] w-[100vw] items-center justify-center overflow-auto bg-[#00000088] pb-[10rem] backdrop-blur-md ",
      cover:
        " bg-slate-50 lg:p-8 p-2 mt-[10rem] lg:mt-[30rem] lg:w-fit w-[100%] relative ",
      swiper: "mb-2 w-[100%] lg:w-[50rem]  ",
      thumbs: "w-[40rem]",
    },
  };

  return (
    <div className={size[`${isFullScreen ? "zoom" : "normal"}`].overlay}>
      <div
        ref={ref}
        className={size[`${isFullScreen ? "zoom" : "normal"}`].cover}
      >
        {isFullScreen && (
          <button
            onClick={close}
            className="absolute left-3 top-3 z-40 rounded-full bg-slate-300 px-3 py-1 text-4xl font-bold "
          >
            &times;
          </button>
        )}
        <Swiper
          className={size[`${isFullScreen ? "zoom" : "normal"}`].swiper}
          modules={[FreeMode, Navigation, Thumbs]}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        >
          {images.map((image, i) => (
            <SwiperSlide key={i}>
              <img
                onClick={handleZoom}
                src={image}
                className="h-full w-full "
                alt="propertyImage"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <Swiper
          modules={[FreeMode, Navigation, Thumbs]}
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={6}
          freeMode={true}
          watchSlidesProgress={true}
          className={size[`${isFullScreen ? "zoom" : "normal"}`].thumbs}
        >
          {images.map((image, i) => (
            <SwiperSlide key={i}>
              <img src={image} className=" h-full" alt="propertyImage" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
