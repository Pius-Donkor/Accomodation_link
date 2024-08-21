// src/pages/Properties.js
import React from "react";
import Button from "../../UI/Button";
import Table from "../../UI/Table";
import TableHeader from "../../UI/TableHeader";
import TableRow from "../../UI/TableRow";
import TableHeadData from "../../UI/TableHeadData";
import TableData from "../../UI/TableData";
import TableBody from "../../UI/TableBody";
import useFilterSort from "../../hooks/useFilterSort";
import PropertiesCard from "./PropertiesCard";

const Properties = () => {
  const { sortedProperties, isLoading, propertiesError } = useFilterSort(
    false,
    true,
  );
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Properties</h1>
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
            ? sortedProperties.map((property) => (
                <PropertiesCard key={property.id} property={property} />
              ))
            : (!isLoading && "no property has been uploaded yet 😔") || ""}
        </TableBody>
      </Table>
    </div>
  );
};

export default Properties;
