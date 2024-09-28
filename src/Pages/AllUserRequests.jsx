import React, { useState } from "react";
import Button from "../UI/Button";
import { useRentRequestContext } from "../contexts/RentRequestContext";
import useGetUser from "../Features/User/useGetUser";
import RequestCard from "../UI/RequestCard";
import TenantLandlordCard from "../UI/TenantLandlordCard";

export default function AllUserRequests() {
  const [requestStatus, setRequestStatus] = useState("sent");
  const [confirmationStatus, setConfirmationStatus] = useState("all");
  const { allUserRequests } = useRentRequestContext();
  const { userData } = useGetUser();

  function handleActiveReqStatus(status) {
    if (requestStatus === status) return "animate-pulse bg-slate-200";
  }
  function handleActiveConfStatus(status) {
    if (confirmationStatus === status) return "animate-pulse bg-slate-200";
  }

  return (
    <div className="flex h-full w-full flex-col items-center gap-4 bg-slate-300  ">
      <nav className="mt-4 flex w-fit  flex-col items-center gap-2 rounded-lg bg-slate-400 p-1 shadow-lg ">
        {/* super bar */}
        <div className="flex gap-2">
          <div className={`${handleActiveReqStatus("sent")} px-2`}>
            <Button
              type="nav"
              onClick={() => {
                setRequestStatus("sent");
                setConfirmationStatus("all");
              }}
            >
              Sent
            </Button>
          </div>
          <div className={`${handleActiveReqStatus("received")} px-2`}>
            <Button
              type="nav"
              onClick={() => {
                setRequestStatus("received");
                setConfirmationStatus("all");
              }}
            >
              Received
            </Button>
          </div>
          <div className={`${handleActiveReqStatus("tenant-to")} px-2`}>
            <Button
              type="nav"
              onClick={() => {
                setRequestStatus("tenant-to");
                setConfirmationStatus("all");
              }}
            >
              Tenant-to
            </Button>
          </div>
          <div className={`${handleActiveReqStatus("landlord-to")} px-2`}>
            <Button
              type="nav"
              onClick={() => {
                setRequestStatus("landlord-to");
                setConfirmationStatus("all");
              }}
            >
              Landlord-To
            </Button>
          </div>
        </div>
        {/* mini bar */}
        {requestStatus !== "tenant-to" && requestStatus !== "landlord-to" && (
          <div className="flex gap-2">
            <div className={`${handleActiveConfStatus("all")} px-2`}>
              <Button
                type="transparentRed"
                onClick={() => {
                  setConfirmationStatus("all");
                }}
              >
                All
              </Button>
            </div>
            <div className={`${handleActiveConfStatus("pending")} px-2`}>
              <Button
                type="blue"
                onClick={() => {
                  setConfirmationStatus("pending");
                }}
              >
                Pending
              </Button>
            </div>
            <div className={`${handleActiveConfStatus("confirmed")} px-2`}>
              <Button
                type="green"
                onClick={() => {
                  setConfirmationStatus("confirmed");
                }}
              >
                Confirmed
              </Button>
            </div>
            <div className={`${handleActiveConfStatus("rejected")} px-2`}>
              <Button
                type="reddish"
                onClick={() => {
                  setConfirmationStatus("rejected");
                }}
              >
                Rejected
              </Button>
            </div>
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
  if (confirmationStatus === "all")
    return requests.map((request) => (
      <RequestCard key={request.id} request={request} />
    ));
  return requests
    .filter((request) => request.status === confirmationStatus)
    .map((request) => <RequestCard key={request.id} request={request} />);
}

function ReceiveComponent({ confirmationStatus, requests = [] }) {
  if (confirmationStatus === "all")
    return requests.map((request) => (
      <RequestCard
        type="currentUser"
        key={request.id}
        isPendingReceivedRequest={request.status === "pending"}
        request={request}
      />
    ));

  return (
    <div className="flex w-full flex-col ">
      <h1 className=" text-xl text-slate-100 ">Received rent requests</h1>
      <div className="flex w-full flex-wrap justify-center gap-2 ">
        {requests
          .filter((request) => request.status === confirmationStatus)
          .map((request) => (
            <RequestCard
              type="currentUser"
              isPendingReceivedRequest={request.status === "pending"}
              key={request.id}
              request={request}
            />
          ))}
      </div>
    </div>
  );
}

function TenantLandlordToComponent({ requests, requestStatus }) {
  return (
    <RequestsCoverComponent
      title={
        requestStatus === "tenant-to"
          ? "You are a Tenant to :"
          : "You are a Landlord to :"
      }
    >
      {requests.map((request) => (
        <TenantLandlordCard request={request} requestStatus={requestStatus} />
      ))}
    </RequestsCoverComponent>
  );
}

function RequestsCoverComponent({ children, title }) {
  return (
    <div className="flex w-full flex-col ">
      <h1 className=" text-xl text-slate-100 ">{title}</h1>
      <div className="flex w-full flex-wrap justify-center gap-2 ">
        {children}
      </div>
    </div>
  );
}
