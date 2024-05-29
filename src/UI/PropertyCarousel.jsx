import { useState } from "react";
import NormalSizeCarousel from "./NormalSizeCarousel";

export default function PropertyCarousel({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="overflow-y-auto">
      <NormalSizeCarousel
        thumbsSwiper={thumbsSwiper}
        setThumbsSwiper={setThumbsSwiper}
        images={images}
      />
    </div>
  );
}
