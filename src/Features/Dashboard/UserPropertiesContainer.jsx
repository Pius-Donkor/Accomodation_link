import React from "react";
import UserPropertyCard from "./UserPropertyCard";

export default function UserPropertiesContainer({ properties }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 ">
      {properties.map((property) => (
        <UserPropertyCard property={property} key={property.documentId} />
      ))}
    </div>
  );
}
