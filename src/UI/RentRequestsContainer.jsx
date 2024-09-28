import React from "react";
import RentRequest from "./RentRequest";

export default function RentRequestsContainer({
  tempRentRequest,
  onCloseModal,
  setTempRentRequests,
}) {
  return (
    <div className="flex h-[28rem] w-fit flex-col overflow-y-hidden ">
      {tempRentRequest.length
        ? tempRentRequest.map((request) => (
            <RentRequest
              request={request}
              key={request.id}
              onCloseModal={onCloseModal}
              setTempRentRequests={setTempRentRequests}
            />
          ))
        : ""}
    </div>
  );
}
