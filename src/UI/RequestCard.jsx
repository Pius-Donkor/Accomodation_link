import React, { useState } from "react";
import useGetProperty from "../Features/properties/useGetProperty";
import useResPropertyRent from "../Features/properties/useResPropertyRent";
import useGetUser from "../Features/User/useGetUser";
import useSendEmail from "../hooks/useSendEmail";
import useGetOwner from "../Features/User/useGetOwner";
import RegularCarousel from "./RegularCarousel";
import RentRequest from "./RentRequest";
import PageLoading from "./PageLoading";

export default function RequestCard({
  request,
  type = "owner",
  isPendingReceivedRequest = false,
}) {
  const { propertyId, price_offered, requestFromId, requestToId, status } =
    request;
  const { property, propertyLoading, propertyError } =
    useGetProperty(propertyId);

  // this time we used the useOwner hook to load te data of the tenant instead of the landlord/propertyOwner
  const {
    propertyOwner,
    errorOwner,
    isLoadingOwner: isLoadingTenant,
  } = useGetOwner(type === "owner" ? requestToId : requestFromId);

  if (isLoadingTenant || propertyLoading) return <PageLoading />;
  if (isPendingReceivedRequest) return <RentRequest request={request} />;
  return (
    <div className="flex h-[10rem] w-fit rounded-lg bg-slate-200 p-2 shadow-lg shadow-[#000000d0] ">
      <div className="h-full w-[11rem]  ">
        <RegularCarousel property={property} />
      </div>
      <div className="flex flex-col justify-center pl-2 ">
        <p className="text-slate-900">
          <strong>Name :</strong> <span>{property?.name}</span>
        </p>
        <p className="text-slate-900">
          <strong>Actual Price :</strong>
          <span>{property?.price}</span>
        </p>
        <p className="text-slate-900">
          <strong>Price Offered :</strong>
          <span>{price_offered}</span>
        </p>
        <p className="text-slate-900">
          <strong>Status :</strong>
          <span>{status}</span>
        </p>
        <p className="text-slate-900">
          <strong>{type === "owner" ? "Owners Name" : "Tenant Name"} : </strong>
          <span>{propertyOwner?.userName}</span>
        </p>
      </div>
    </div>
  );
}
