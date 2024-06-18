import React, { useEffect, useState } from "react";
import Button from "../../UI/Button";
import PageError from "../../UI/PageError";
import LoadingProperties from "./LoadingProperties";
import useFilterSort from "../../hooks/useFilterSort";

export default function Properties(PropertiesCard) {
  return function NewProperties({ allowCrud, noPadding = false }) {
    const { sortedProperties, isLoading, propertiesError } = useFilterSort();
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

    // console.log(sortedProperties);
    if (isLoading) return <LoadingProperties />;
    if (propertiesError) {
      return <PageError errorMessage={propertiesError.message} />;
    }

    // Calculate the total number of pages
    const totalPages = Math.ceil(sortedProperties.length / propertiesPerPage);

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
      <div
        className={`  flex w-[100%] flex-col items-center justify-center gap-12 pb-4 `}
      >
        <div
          className={`${noPadding ? "" : "mt-[10rem]"} flex w-[100%] flex-row flex-wrap items-center justify-center gap-12`}
        >
          {currentProperties.map((property) => (
            <PropertiesCard
              key={property.id}
              property={property}
              allowCrud={allowCrud}
            />
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
  };
}
