import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import Button from "../../UI/Button";
import useGetUsersProperties from "../properties/useGetUsersProperties";
import PageLoading from "../../UI/PageLoading";
import UserPropertiesContainer from "./UserPropertiesContainer";
import PageError from "../../UI/PageError";
import { useRentRequestContext } from "../../contexts/RentRequestContext";
import { TenantLandlordToComponent } from "../../Pages/AllUserRequests";
export default function UserDetail({ user = {} }) {
  const [userActivity, setUserActivity] = useState("properties");
  const { rentRequests } = useRentRequestContext();
  const { error, isLoading, usersProperties } = useGetUsersProperties(
    user?.userId,
  );
  // data confirmed request of user being a landlord
  const landlordTo =
    rentRequests?.filter(
      (request) =>
        user?.rentRequests?.includes(request.id) &&
        request.status === "confirmed" &&
        request.requestToId === user.userId,
    ) || [];
  const tenantTo =
    rentRequests?.filter(
      (request) =>
        user?.rentRequests?.includes(request.id) &&
        request.status === "confirmed" &&
        request.requestFromId === user.userId,
    ) || [];

  function handleDisplayActivity(status) {
    if (userActivity === status) return "animate-pulse bg-slate-200";
  }

  if (isLoading) return <PageLoading />;
  if (error) return <PageError errorMessage={error.message} />;
  return (
    <div className="h-[90vh] w-[90vw] bg-slate-300 ">
      {/* first section */}
      <div className="flex w-full justify-end  ">
        <div className="flex gap-1 divide-x-2 divide-slate-200 bg-slate-400 p-1 ">
          <div className="flex flex-col gap-1">
            <p className=" text-slate-800">
              <span className="font-bold">Name : </span>
              {user.userName}
            </p>
            <p className=" text-slate-800">
              <span className="font-bold">Contact : </span>
              {user.contact}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className=" text-slate-800">
              <span className="font-bold">E-mail : </span>
              {user.email}
            </p>
            <p className=" text-slate-800">
              <span className="font-bold">Location : </span>
              {user.location}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <p className=" text-slate-800">
              <span className="font-bold">Status : </span>
              {user.status}
            </p>
            <p className=" text-slate-800">
              <span className="font-bold">Role : </span>
              {user.role}
            </p>
          </div>

          <div className=" size-12 rounded-full">
            {user?.profileImage ? (
              <img
                src={user?.profileImage}
                alt="profile"
                className="h-full w-full rounded-full"
              />
            ) : (
              <FaUser className="size-full rounded-full text-slate-700 " />
            )}
          </div>
        </div>
      </div>
      {/* second section */}
      <div className="flex w-full justify-center ">
        <div className="mt-8 flex gap-2 rounded-lg bg-slate-400 p-2 ">
          <div className={`${handleDisplayActivity("properties")} px-2`}>
            <Button
              type="nav"
              onClick={() => {
                setUserActivity("properties");
              }}
            >
              Properties
            </Button>
          </div>
          <div className={`${handleDisplayActivity("tenant-to")} px-2`}>
            <Button
              type="nav"
              onClick={() => {
                setUserActivity("tenant-to");
              }}
            >
              Tenant-to
            </Button>
          </div>
          <div className={`${handleDisplayActivity("landlord-to")} px-2`}>
            <Button
              type="nav"
              onClick={() => {
                setUserActivity("landlord-to");
              }}
            >
              Landlord-To
            </Button>
          </div>
        </div>
      </div>
      {/* last section */}
      <div className="mt-8 h-[65vh] w-full overflow-y-auto bg-slate-200 p-4 ">
        {userActivity === "properties" && (
          <UserPropertiesContainer properties={usersProperties} />
        )}

        {userActivity === "tenant-to" && (
          <TenantLandlordToComponent
            requestStatus={userActivity}
            requests={tenantTo}
            noTitle={true}
          />
        )}
        {userActivity === "landlord-to" && (
          <TenantLandlordToComponent
            requestStatus={userActivity}
            requests={landlordTo}
            noTitle={true}
          />
        )}
      </div>
    </div>
  );
}
