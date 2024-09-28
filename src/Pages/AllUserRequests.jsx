import React, { useState } from "react";
import Button from "../UI/Button";
import { useRentRequestContext } from "../contexts/RentRequestContext";
import useGetUser from "../Features/User/useGetUser";
import RequestCard from "../UI/RequestCard";
import RentRequest from "../UI/RentRequest";
import TenantLandlordCard from "../UI/TenantLandlordCard";

export default function AllUserRequests() {
  const [requestStatus, setRequestStatus] = useState("sent");
  const [confirmationStatus, setConfirmationStatus] = useState("pending");
  const { allUserRequests } = useRentRequestContext();
  const { userData } = useGetUser();

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 bg-slate-300  ">
      <nav className="mt-4 flex w-fit  flex-col items-center gap-2 rounded-lg bg-slate-400 p-1 shadow-lg ">
        {/* super bar */}
        <div className="flex gap-2">
          <Button
            type="nav"
            onClick={() => {
              setRequestStatus("sent");
            }}
          >
            Sent
          </Button>
          <Button
            type="nav"
            onClick={() => {
              setRequestStatus("received");
            }}
          >
            Received
          </Button>
          <Button
            type="nav"
            onClick={() => {
              setRequestStatus("tenant-to");
            }}
          >
            Tenant-to
          </Button>
          <Button
            type="nav"
            onClick={() => {
              setRequestStatus("landlord-to");
            }}
          >
            Landlord-To
          </Button>
        </div>
        {/* mini bar */}
        {requestStatus !== "tenant-to" && requestStatus !== "landlord-to" && (
          <div className="flex gap-2">
            <Button
              type="transparentRed"
              onClick={() => {
                setConfirmationStatus("all");
              }}
            >
              All
            </Button>
            <Button
              type="blue"
              onClick={() => {
                setConfirmationStatus("pending");
              }}
            >
              Pending
            </Button>
            <Button
              type="green"
              onClick={() => {
                setConfirmationStatus("confirmed");
              }}
            >
              Confirmed
            </Button>
            <Button
              type="reddish"
              onClick={() => {
                setConfirmationStatus("rejected");
              }}
            >
              Rejected
            </Button>
          </div>
        )}
      </nav>
      {/* Details */}
      {allUserRequests?.length ? (
        <div className="flex h-[69dvh] w-full flex-wrap justify-center gap-3 overflow-y-auto bg-slate-400 p-3 ">
          {requestStatus === "sent" && (
            <SendComponent
              confirmationStatus={confirmationStatus}
              requests={allUserRequests.filter(
                (request) => request.requestFromId === userData?.userId,
              )}
            />
          )}
          {requestStatus === "received" && (
            <ReceiveComponent
              confirmationStatus={confirmationStatus}
              requests={allUserRequests.filter(
                (request) => request.requestToId === userData?.userId,
              )}
            />
          )}
          {requestStatus === "tenant-to" && (
            <TenantLandlordToComponent
              requestStatus={requestStatus}
              requests={allUserRequests.filter(
                (request) =>
                  request.requestFromId === userData?.userId &&
                  request.status === "confirmed",
              )}
            />
          )}
          {requestStatus === "landlord-to" && (
            <TenantLandlordToComponent
              requestStatus={requestStatus}
              requests={allUserRequests.filter(
                (request) =>
                  request.requestToId === userData?.userId &&
                  request.status === "confirmed",
              )}
            />
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

function SendComponent({ confirmationStatus, requests = [] }) {
  console.log(requests);

  if (confirmationStatus === "all")
    return requests.map((request) => {
      return <RequestCard key={request.id} request={request} />;
    });
  return requests
    .filter((request) => request.status === confirmationStatus)
    .map((request) => {
      return <RequestCard key={request.id} request={request} />;
    });
}

function ReceiveComponent({ confirmationStatus, requests = [] }) {
  if (confirmationStatus === "all")
    return requests.map((request) => {
      return (
        <RequestCard
          type="currentUser"
          key={request.id}
          isPendingReceivedRequest={request.status === "pending"}
          request={request}
        />
      );
    });

  return requests
    .filter((request) => request.status === confirmationStatus)
    .map((request) => {
      return (
        <RequestCard
          type="currentUser"
          isPendingReceivedRequest={request.status === "pending"}
          key={request.id}
          request={request}
        />
      );
    });
}

function TenantLandlordToComponent({ requests, requestStatus }) {
  return (
    <div className="flex w-full flex-col ">
      <h1 className=" text-xl text-slate-100 ">
        {requestStatus === "tenant-to"
          ? "You are a Tenant to :"
          : "You are a Landlord to :"}
      </h1>
      <div className="flex w-full flex-wrap justify-center gap-2 ">
        {requests.map((request) => (
          <TenantLandlordCard request={request} requestStatus={requestStatus} />
        ))}
      </div>
    </div>
  );
}
