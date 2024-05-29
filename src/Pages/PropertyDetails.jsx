import { useParams } from "react-router-dom";
import useGetProperty from "../Features/properties/useGetProperty";
import PageError from "../UI/PageError";
import PropertyCarousel from "../UI/PropertyCarousel";

export default function PropertyDetails() {
  const { id } = useParams();
  const { property, propertyLoading, propertyError } = useGetProperty(id);

  if (propertyLoading)
    return <p className=" mt-[10rem] text-7xl ">loading...</p>;
  if (propertyError) return <PageError errorMessage={propertyError.message} />;

  return (
    <div className="mx-12 mb-[5rem] mt-[10rem] w-full ">
      {/* image carousel and map */}
      <section className="flex w-[100vw] ">
        {/* CAROUSEL */}
        <div className="w-60% relative">
          <PropertyCarousel images={property.image} />
        </div>
        {/* map */}
        <div className="w-40%"></div>
      </section>
    </div>
  );
}
