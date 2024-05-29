import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ZoomedCarousel({
  images,
  thumbsSwiper,
  setThumbsSwiper,
}) {
  return (
    <div>
      <Swiper
        className="mb-2 h-[40rem] w-[50rem]"
        modules={[FreeMode, Navigation, Thumbs]}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <img src={image} alt="propertyImage" />
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
        className="w-[50rem]"
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <img src={image} alt="propertyImage" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
