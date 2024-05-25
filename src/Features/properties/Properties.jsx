import React, { useEffect, useState } from "react";
import PropertiesCard from "./PropertiesCard";
import useGetProperties from "./useGetProperties";
import Button from "../../UI/Button";
import { useSearchParams } from "react-router-dom";

import { moneyToNumber } from "../../utils/helper";
import PageError from "../../UI/PageError";
import LoadingProperties from "./LoadingProperties";
import { useFilterContext } from "../../hooks/FilterState";
export default function Properties() {
  const { properties, propertiesError, isLoading } = useGetProperties();
  const [currentPage, setCurrentPage] = useState(0);
  const [searchParams] = useSearchParams();
  const sortParameter = searchParams.get("sortBy");
  const {
    state: { priceRange, rating, rentType },
  } = useFilterContext();
  console.log(priceRange, rating, rentType);
  let filteredProperties;
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

  if (isLoading) return <LoadingProperties />;
  if (propertiesError) {
    return <PageError errorMessage={propertiesError.message} />;
  }
  if (priceRange.min && priceRange.max) {
    filteredProperties = properties
      .slice()
      .filter(
        (property) =>
          moneyToNumber(property.price) > priceRange.min &&
          moneyToNumber(property.price) < priceRange.max,
      );
  } else {
    filteredProperties = properties.slice();
  }

  if (sortParameter === "all") {
    sortedProperties = filteredProperties.slice();
  } else if (sortParameter === "low-price") {
    sortedProperties = filteredProperties
      .slice()
      .sort((a, b) => moneyToNumber(a.price) - moneyToNumber(b.price));
  } else if (sortParameter === "high-price") {
    sortedProperties = filteredProperties
      .slice()
      .sort((a, b) => moneyToNumber(b.price) - moneyToNumber(a.price));
  } else {
    sortedProperties = filteredProperties.slice();
  }

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

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
