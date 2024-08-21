import React from "react";
import TableRow from "../../UI/TableRow";
import TableData from "../../UI/TableData";
import Button from "../../UI/Button";

export default function PropertiesCard({ property }) {
  const { name, price, status, rentStatus, location, image } = property;
  return (
    <TableRow>
      <TableData withFlex={true}>
        <img className="mb-2 w-12" src={image.at(0)} alt="dummy" />
        <p className="whitespace-normal">{name}</p>
      </TableData>
      <TableData>
        <p className="whitespace-normal">{location}</p>
      </TableData>
      <TableData>{price}</TableData>
      <TableData>{status}</TableData>
      <TableData>{rentStatus}</TableData>
      <TableData withFlex={true} hasButtons={true}>
        <Button type="blue">Approve</Button>
        <Button type="reddish">Reject</Button>
        <Button type="green">Reset Rent</Button>
      </TableData>
    </TableRow>
  );
}
