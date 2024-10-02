import React from "react";
import RegularCarousel from "../../UI/RegularCarousel";
import { useNavigate } from "react-router-dom";

export default function UserPropertyCard({ property = {} }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/propertyDetails/${property.documentId}`)}
      className="flex w-[22rem] flex-col gap-4 bg-slate-300 p-2 transition-all hover:scale-90"
    >
      <p className="text-xl font-semibold text-slate-800">{property.name}</p>
      <div className="h-[20rem] w-[20rem] ">
        <RegularCarousel property={property} />
      </div>
    </div>
  );
}
