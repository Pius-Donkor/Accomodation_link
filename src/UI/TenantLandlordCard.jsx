import React from "react";
import useGetProperty from "../Features/properties/useGetProperty";
import useGetOwner from "../Features/User/useGetOwner";
import PageLoading from "./PageLoading";
import RegularCarousel from "./RegularCarousel";

export default function TenantLandlordCard({ request, requestStatus }) {
  const { propertyId, price_offered, requestFromId, requestToId, status } =
    request;
  const { property, propertyLoading, propertyError } =
    useGetProperty(propertyId);

  // this time we used the useOwner hook to load te data of the tenant instead of the landlord/propertyOwner
  const {
    propertyOwner,
    errorOwner,
    isLoadingOwner: isLoadingTenant,
  } = useGetOwner(requestStatus === "tenant-to" ? requestToId : requestFromId);

  if (isLoadingTenant || propertyLoading) return <PageLoading />;

  return (
    <div className="flex h-[10rem] w-fit rounded-lg bg-slate-200 p-2 shadow-lg shadow-[#000000d0] ">
      <div className="h-full w-[11rem]  ">
        <RegularCarousel property={property} />
      </div>
      <div className="flex flex-col justify-center pl-2 ">
        <p className="text-slate-900">
          <strong>
            {requestStatus === "tenant-to" ? "Owner's Name" : "Tenant Name"} :
          </strong>
          <span>{propertyOwner?.userName}</span>
        </p>
        <p className="text-slate-900">
          <strong>Price Agreed on :</strong>
          <span>{price_offered}</span>
        </p>
        <p className="text-slate-900">
          <strong>Contact :</strong>
          <span>{propertyOwner.contact}</span>
        </p>
        <p className="text-slate-900">
          <strong>E-mail :</strong>
          <span>{propertyOwner.email}</span>
        </p>
        <p className="text-slate-900">
          <strong> Property Name :</strong> <span>{property?.name}</span>
        </p>
      </div>
      {propertyOwner?.profileImage ? (
        <img
          className="size-12 rounded-full "
          src={propertyOwner.profileImage}
          alt="profile"
        />
      ) : (
        ""
      )}
    </div>
  );
}
