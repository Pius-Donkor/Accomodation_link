import React from "react";

export default function PropertiesFilterSortBoard({
  rentStatus,
  approvalStatus,
  locationFilter,
  handleApprovalStatus,
  handleRentStatus,
  handleLocationFilter,
}) {
  function handleApprovalType(status) {
    return approvalStatus === status;
  }
  function handleRentType(status) {
    return rentStatus === status;
  }
  return (
    <nav className="flex w-full justify-between rounded-md bg-slate-300 px-2 py-1 text-sm ">
      <div className="flex items-center  gap-2">
        <label htmlFor="property-location" className="font-bold text-slate-700">
          Filter by location :
        </label>
        <input
          value={locationFilter}
          type="text"
          id="property-location"
          placeholder="enter location"
          className="rounded-md px-1  outline-none "
          onChange={(e) => handleLocationFilter(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-1">
        <p className="font-bold text-slate-700">Rental Status :</p>
        <span
          onClick={() => handleRentStatus("rented")}
          className={`${handleRentType("rented") ? "bg-green-200" : "bg-slate-100 "} cursor-pointer rounded-2xl px-2 py-1  text-slate-700  hover:bg-green-200`}
        >
          Rented
        </span>
        <span
          onClick={() => handleRentStatus("available")}
          className={`${handleRentType("available") ? "bg-green-200" : "bg-slate-100 "} cursor-pointer rounded-2xl px-2 py-1  text-slate-700  hover:bg-green-200`}
        >
          Available
        </span>
        <span
          onClick={() => handleRentStatus("")}
          className={`${handleRentType("") ? "bg-green-200" : "bg-slate-100 "} cursor-pointer rounded-2xl px-2 py-1  text-slate-700  hover:bg-green-200`}
        >
          All
        </span>
      </div>
      <div className="flex items-center  gap-1">
        <p className="font-bold text-slate-700">Approval Status :</p>
        <span
          onClick={() => handleApprovalStatus("pending")}
          className={`${handleApprovalType("pending") ? "bg-green-200" : "bg-slate-100"} cursor-pointer rounded-2xl px-2 py-1  text-slate-700  hover:bg-green-200`}
        >
          Pending
        </span>
        <span
          onClick={() => handleApprovalStatus("rejected")}
          className={`${handleApprovalType("rejected") ? "bg-green-200" : "bg-slate-100 "} cursor-pointer rounded-2xl px-2 py-1  text-slate-700  hover:bg-green-200`}
        >
          Rejected
        </span>
        <span
          onClick={() => handleApprovalStatus("accepted")}
          className={`${handleApprovalType("accepted") ? "bg-green-200" : "bg-slate-100 "} cursor-pointer rounded-2xl px-2 py-1  text-slate-700  hover:bg-green-200`}
        >
          Accepted
        </span>
        <span
          onClick={() => handleApprovalStatus("")}
          className={`${handleApprovalType("") ? "bg-green-200" : "bg-slate-100 "} cursor-pointer rounded-2xl px-2 py-1  text-slate-700  hover:bg-green-200`}
        >
          All
        </span>
      </div>
    </nav>
  );
}
