import React from "react";
import PropertiesCard from "../properties/PropertiesCard";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
export default function ListingCard() {
  return (
    <div>
      <PropertiesCard />
      <div className="flex gap-4">
        <span role="button">
          <CiEdit />
        </span>
        <span role="button">
          <RiDeleteBinLine />
        </span>
      </div>
    </div>
  );
}
