// src/pages/Properties.js
import React from "react";
import Button from "../../UI/Button";
import Table from "../../UI/Table";
import TableHeader from "../../UI/TableHeader";
import TableRow from "../../UI/TableRow";
import TableHeadData from "../../UI/TableHeadData";
import TableData from "../../UI/TableData";
import TableBody from "../../UI/TableBody";

const Properties = () => {
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
          <TableRow>
            <TableData withFlex={true}>
              <img className="mb-2 w-12" src="/18b-min.jpeg" alt="dummy" />
              Beautiful Apartment
            </TableData>
            <TableData>Accra</TableData>
            <TableData>$1200</TableData>
            <TableData>Pending</TableData>
            <TableData>Rented</TableData>
            <TableData withFlex={true} hasButtons={true}>
              <Button type="blue">Approve</Button>
              <Button type="reddish">Reject</Button>
              <Button type="green">Reset Rent</Button>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData withFlex={true}>
              <img className="mb-2 w-12" src="/18b-min.jpeg" alt="dummy" />
              Beautiful Apartment
            </TableData>
            <TableData>Accra</TableData>
            <TableData>$1200</TableData>
            <TableData>Pending</TableData>
            <TableData>Rented</TableData>
            <TableData withFlex={true} hasButtons={true}>
              <Button type="blue">Approve</Button>
              <Button type="reddish">Reject</Button>
              <Button type="green">Reset Rent</Button>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData withFlex={true}>
              <img className="mb-2 w-12" src="/18b-min.jpeg" alt="dummy" />
              Beautiful Apartment
            </TableData>
            <TableData>Accra</TableData>
            <TableData>$1200</TableData>
            <TableData>Pending</TableData>
            <TableData>Rented</TableData>
            <TableData withFlex={true} hasButtons={true}>
              <Button type="blue">Approve</Button>
              <Button type="reddish">Reject</Button>
              <Button type="green">Reset Rent</Button>
            </TableData>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Properties;
