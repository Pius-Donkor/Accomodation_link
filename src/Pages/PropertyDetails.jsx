import { useParams } from "react-router-dom";
import useGetProperty from "../Features/properties/useGetProperty";
import PageError from "../UI/PageError";
import PropertyCarousel from "../UI/PropertyCarousel";
import Button from "../UI/Button";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { useMoveBack } from "../hooks/useMoveBack";

export default function PropertyDetails() {
  const { id } = useParams();
  const { property, propertyLoading, propertyError } = useGetProperty(id);
  const moveBack = useMoveBack();

  if (propertyLoading)
    return <p className=" mt-[10rem] text-7xl ">loading...</p>;
  if (propertyError) return <PageError errorMessage={propertyError.message} />;

  return (
    <div className="mx-12 mb-[5rem] mt-[6rem] flex flex-col justify-center gap-16  ">
      {/* navigation buttons */}
      <div className=" flex gap-8">
        <Button link={"/"} type="nav">
          <FaHome className=" mr-2 text-slate-700 " /> home
        </Button>
        <Button type="nav" onClick={moveBack}>
          <BiSolidLeftArrow className=" text-slate-700" /> back
        </Button>
      </div>
      {/* image carousel and map */}
      <section className="flex w-[100%] justify-between ">
        {/* CAROUSEL */}
        <div className=" shadow-md">
          <PropertyCarousel images={property.image} />
        </div>
        {/* map */}
        <div className=" h-[37rem] w-[32rem] bg-slate-400 "></div>
      </section>
    </div>
  );
}
