import { useParams } from "react-router-dom";
import useGetProperty from "../Features/properties/useGetProperty";
import PageError from "../UI/PageError";
import PropertyCarousel from "../UI/PropertyCarousel";
import Button from "../UI/Button";
import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidRightArrow } from "react-icons/bi";
import { BiDetail } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { useMoveBack } from "../hooks/useMoveBack";
import { FaLocationDot, FaLocationPin } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import SingleDetail from "../UI/SingleDetail";
import Accordion from "../UI/Accordion";
import AccordionChild from "../UI/AccordionChild";
import MapComponent from "../Features/mapping/MapComponent";

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
      {/* property name and small details */}
      <div className=" flex justify-between ">
        <div className=" w-[40rem]">
          <h1 className=" text-left text-3xl font-medium ">{property.name}</h1>
          <span className=" flex gap-1">
            <FaLocationDot className="text-[#b33479] " />
            {property.location}
          </span>
        </div>
        <p className="mr-4 flex items-center gap-1 text-xl ">
          <FaMapMarkedAlt className=" text-[#1c5e1c]" /> Use map below to find
          the location of this property
        </p>
      </div>

      {/* image carousel and map */}
      <section className="flex w-[100%] justify-between ">
        {/* CAROUSEL */}
        <div className=" shadow-md transition-all duration-300 ">
          <PropertyCarousel images={property.image} />
        </div>
        {/* map */}
        <div className=" h-[37rem] w-[32rem] bg-slate-400 ">
          <MapComponent />
        </div>
      </section>
      {/* other property details */}
      <div className=" flex flex-col gap-12">
        {/* Description */}
        <SingleDetail
          title={"Description"}
          value={property.description}
          type="long"
        />
        <SingleDetail title={"Rules"} value={property.rules} type="long" />
        <div className=" flex flex-grow flex-wrap gap-8 ">
          <SingleDetail title={"Price"} value={property.price} />
          <SingleDetail title={"Rating"} value={property.rating} />
          <SingleDetail title={"Year_built"} value={property.year_built} />
          <SingleDetail title={"rules"} value={property.rules} />
          <SingleDetail title={"Size"} value={property.size} />
          <SingleDetail title={"Bedrooms"} value={property.bedrooms} />
          <SingleDetail title={"Bathrooms"} value={property.bathrooms} />
        </div>
        <div className=" flex gap-12">
          <Accordion heading={"neighboring facilities"}>
            {property.neighborhood.map((facility, i) => (
              <AccordionChild key={i}>{facility}</AccordionChild>
            ))}
          </Accordion>
          <Accordion heading={"Amenities"}>
            {property.amenities.map((facility, i) => (
              <AccordionChild key={i}>{facility}</AccordionChild>
            ))}
          </Accordion>
          <Accordion heading={"Features"}>
            {property.features.map((facility, i) => (
              <AccordionChild key={i}>{facility}</AccordionChild>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
