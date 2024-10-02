import React, { useState } from "react";
import Button from "./Button";
import RegularCarousel from "./RegularCarousel";
import useReqPropertyRent from "../Features/properties/useReqPropertyRent";
import toast from "react-hot-toast";
import PageLoading from "./PageLoading";
import useSendEmail from "../hooks/useSendEmail";
import { cleanAndFormatCurrency } from "../utils/helper";

export default function RentRequestForm({
  property,
  propertyOwner,
  requestingUser,
  onCloseModal,
}) {
  const [offeredPrice, setOfferedPrice] = useState(property.price);
  const {
    createUpdateRentRequest,
    createUpdateRentRequestError,
    isProcessingRental,
  } = useReqPropertyRent();
  const { sendEmail } = useSendEmail();
  const [requestedBeforeId] = property?.rentRequests?.filter((requestId) =>
    requestingUser?.rentRequests?.includes(requestId),
  ) || [""];

  function handleSubmit(e) {
    e.preventDefault();
    // console.log({
    //   isRequestedBefore: Boolean(requestedBeforeId),
    //   oldRequestId: requestedBeforeId,
    //   oldRequestsProperty: property?.rentRequests || [],
    //   oldRequestsOwner: propertyOwner?.rentRequests || [],
    //   oldRequestsRequester: requestingUser?.rentRequests || [],
    //   price_offered: offeredPrice,
    //   propertyId: property.docId,
    //   requestFromDocId: requestingUser.documentId,
    //   requestFromId: requestingUser.userId,
    //   requestToDocId: propertyOwner.documentId,
    //   requestToId: propertyOwner.userId,
    //   status: "pending",
    // });
    createUpdateRentRequest(
      {
        isRequestedBefore: Boolean(requestedBeforeId),
        oldRequestId: requestedBeforeId,
        oldRequestsProperty: property?.rentRequests || [],
        oldRequestsOwner: propertyOwner?.rentRequests || [],
        oldRequestsRequester: requestingUser?.rentRequests || [],
        price_offered: offeredPrice,
        propertyId: property.docId,
        requestFromDocId: requestingUser.documentId,
        requestFromId: requestingUser.userId,
        requestToDocId: propertyOwner.documentId,
        requestToId: propertyOwner.userId,
        status: "pending",
      },
      {
        onSuccess: () => {
          toast.success("request has been sent successfully");
          sendEmail({
            to_name: propertyOwner.username,
            from_name: requestingUser.userName,
            message: `${requestingUser.userName} has sent you a request to rent your property "${property.name}" visit our website https://accomodation-link.vercel.app/ to check it out `,
            to_email: propertyOwner.email,
            from_email: requestingUser.email,
          });
          onCloseModal();
        },
      },
    );
    // alert("submitted");
  }

  return (
    <div className="flex h-[60dvh] w-[50vw] bg-slate-400 p-2">
      {isProcessingRental && <PageLoading />}
      <div className="h-full w-[50%] bg-slate-200 px-4 ">
        <p className="mt-6 text-center ">
          By proceeding with this action, a notification will be sent to
          <span className="font-bold">"{propertyOwner?.userName}" </span>
          regarding your rental request. If you wish to adjust the offered
          amount, please do so using the input field below. Once you are
          certain, you may submit your request to finalize the process.
        </p>
        <div className="mt-6 flex flex-col items-center gap-4">
          <p className=" font-bold">
            Actual Price :
            <span className="text-green-600">
              {" "}
              {cleanAndFormatCurrency(property.price)}
            </span>
          </p>

          <form
            className="flex flex-col items-center gap-8"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="mt flex flex-col items-center  justify-center">
              <label className=" font-bold" htmlFor="offeredPrice">
                Offered Price (GHS) :
              </label>
              <input
                value={offeredPrice}
                onChange={(e) => setOfferedPrice(e.target.value)}
                className="rounded-md bg-slate-50 p-2 shadow-md outline-none "
                type="text"
                id="offeredPrice"
              />
            </div>

            <Button isProcessing={isProcessingRental} type="submit">
              Submit Your Request
            </Button>
          </form>
        </div>
      </div>
      <div className="h-full w-[50%]  bg-slate-100 ">
        <RegularCarousel property={property} />
      </div>
    </div>
  );
}
