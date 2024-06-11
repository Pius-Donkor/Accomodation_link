import React from "react";
import CreateEditListingForm from "./CreateEditListingForm";

export default function CreateEditListing({ property, id }) {
  return (
    <div className="  h-[100dvh] w-full overflow-y-auto bg-slate-200 px-6  pb-8 pt-12 shadow-xl md:h-[40rem] md:w-fit ">
      <div className="mb-12 flex items-center text-xl font-semibold">
        <img className="w-20" src="/houseIcon.png" alt="house_icon" />
        <p> {id ? "Edit" : "Enter"} your property details</p>
      </div>
      <CreateEditListingForm property={property} id={id} />
    </div>
  );
}
