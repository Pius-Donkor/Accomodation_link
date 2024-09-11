// src/pages/Properties.js
import React, { useCallback, useEffect, useState } from "react";
import Table from "../../UI/Table";
import TableHeader from "../../UI/TableHeader";
import TableRow from "../../UI/TableRow";
import TableHeadData from "../../UI/TableHeadData";
import TableBody from "../../UI/TableBody";
import useFilterSort from "../../hooks/useFilterSort";
import PropertiesCard from "./PropertiesCard";
import PropertiesFilterSortBoard from "./PropertiesFilterSortBoard";

const Properties = () => {
  const { sortedProperties, isLoading, propertiesError } = useFilterSort(
    false,
    true,
  );
  const [rentStatus, setRentStatus] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [dashboardProperties, setDashboardProperties] = useState([]);

  useEffect(() => {
    // Filter and sort properties
    let dashboardProperties_filtered = sortedProperties
      ?.sort((a, b) => a?.date - b?.date)
      .filter((property) =>
        property.location.toLowerCase().includes(locationFilter.toLowerCase()),
      );

    if (approvalStatus) {
      dashboardProperties_filtered = dashboardProperties_filtered.filter(
        (property) => property.status === approvalStatus,
      );
    }

    if (rentStatus) {
      dashboardProperties_filtered = dashboardProperties_filtered.filter(
        (property) => property.rentStatus === rentStatus,
      );
    }

    // Update state only if the filtered properties have changed
    if (
      JSON.stringify(dashboardProperties) !==
      JSON.stringify(dashboardProperties_filtered)
    ) {
      setDashboardProperties(dashboardProperties_filtered);
    }
  }, [approvalStatus, rentStatus, locationFilter, sortedProperties]);

  function handleApprovalStatus(status) {
    setApprovalStatus(status);
  }

  function handleRentStatus(status) {
    setRentStatus(status);
  }
  function handleLocationFilter(location) {
    setLocationFilter(location);
  }

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold  ">Properties</h1>

      <PropertiesFilterSortBoard
        approvalStatus={approvalStatus}
        handleApprovalStatus={handleApprovalStatus}
        handleLocationFilter={handleLocationFilter}
        handleRentStatus={handleRentStatus}
        locationFilter={locationFilter}
        rentStatus={rentStatus}
      />
      <div className="flex h-[70dvh] w-full  justify-center overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeadData>Property</TableHeadData>
              <TableHeadData>Location</TableHeadData>
              <TableHeadData>Price</TableHeadData>
              <TableHeadData>Status</TableHeadData>
              <TableHeadData>Rent Status</TableHeadData>
              <TableHeadData>Actions</TableHeadData>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Add dynamic property data here */}
            {isLoading && <h1>Loading Listings </h1>}
            {!isLoading && propertiesError && (
              <p>sorry could not load Properties</p>
            )}
            {sortedProperties.length
              ? dashboardProperties.map((property) => (
                  <PropertiesCard key={property.id} property={property} />
                ))
              : (!isLoading && "no property has been uploaded yet 😔") || ""}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Properties;
