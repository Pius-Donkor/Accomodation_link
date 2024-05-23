import React, { useEffect, useState } from "react";
import PropertiesCard from "./PropertiesCard";
import useGetProperties from "./useGetProperties";
import Button from "../../UI/Button";
import { useSearchParams } from "react-router-dom";

import { moneyToNumber } from "../../utils/helper";
export default function Properties() {
  const { properties, propertiesError, isloading } = useGetProperties();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams] = useSearchParams();
  const sortParameter = searchParams.get("sortBy");
  let sortedProperties;

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

  if (isloading)
    return <p className="mt-[10rem] text-center text-[5rem] ">loading.....</p>;

  if (sortParameter === "all") {
    sortedProperties = properties.slice(0, -1);
  } else if (sortParameter === "low-price") {
    sortedProperties = properties
      .slice(0, -1)
      .sort((a, b) => moneyToNumber(a.price) - moneyToNumber(b.price));
  } else if (sortParameter === "high-price") {
    sortedProperties = properties
      .slice(0, -1)
      .sort((a, b) => moneyToNumber(b.price) - moneyToNumber(a.price));
  } else {
    sortedProperties = properties.slice(0, -1);
  }

  // Calculate the total number of pages
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  // Calculate the properties to display for the current page
  const currentProperties = sortedProperties.slice(
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
          <PropertiesCard key={property.id} property={property} />
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
