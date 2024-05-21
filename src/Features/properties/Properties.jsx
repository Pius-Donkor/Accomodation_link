import React, { useEffect, useState } from "react";
import PropertiesCard from "./PropertiesCard";
import useGetProperties from "./useGetProperties";
import Button from "../../UI/Button";
export default function Properties() {
  const { properties, propertiesError, isloading } = useGetProperties();
  const [currentPage, setCurrentPage] = useState(0);
  const propertiesPerPage = 9;
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToTop();
  }, [currentPage]);

  if (isloading) return <p>loading</p>;
  // Calculate the total number of pages
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  // Calculate the properties to display for the current page
  const currentProperties = properties.slice(
    currentPage * propertiesPerPage,
    currentPage * propertiesPerPage + propertiesPerPage,
  );

  // Handlers for next and back buttons
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className=" mt-16 flex w-[100%] flex-col items-center justify-center gap-12 px-14 py-20">
      <div className="flex w-[100%] flex-row flex-wrap items-center justify-center gap-12 ">
        {currentProperties.map((property) => (
          <PropertiesCard key={properties.id} property={property} />
        ))}
      </div>
      {/* next/prev buttons */}
      <div className="flex gap-12">
        <Button
          onclick={handleBack}
          type={"greenLight"}
          disable={currentPage === 0}
        >
          Back
        </Button>
        <Button
          onclick={handleNext}
          type={"greenLight"}
          disable={currentPage === totalPages - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
