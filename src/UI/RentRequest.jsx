import React, { useState } from "react";
import { IoPrint } from "react-icons/io5";
import useGetProperty from "../Features/properties/useGetProperty";
import useGetOwner from "../Features/User/useGetOwner";
import PageLoading from "../UI/PageLoading";
import RegularCarousel from "../UI/RegularCarousel";
import { FaRegThumbsUp } from "react-icons/fa";
import useResPropertyRent from "../Features/properties/useResPropertyRent";
import useSendEmail from "../hooks/useSendEmail";
import useGetUser from "../Features/User/useGetUser";
import toast from "react-hot-toast";
const RentRequest = ({
  noPending = false,
  onCloseModal = () => {},
  request,
  setTempRentRequests = () => {},
}) => {
  const { propertyId, price_offered, requestFromId, id } = request;
  const { property, propertyLoading, propertyError } =
    useGetProperty(propertyId);
  const { respondToRentReq, respondingError, isResponding } =
    useResPropertyRent();
  const { userData: propertyOwner } = useGetUser();
  const { sendEmail } = useSendEmail();

  // this time we used the useOwner hook to load te data of the tenant instead of the landlord/propertyOwner
  const {
    propertyOwner: tenant,
    errorOwner: tenantError,
    isLoadingOwner: isLoadingTenant,
  } = useGetOwner(requestFromId);

  const [status, setStatus] = useState(null); // null, "confirmed", "rejected", "pending"

  function handleRespondToRequest(status) {
    console.log("running");
    if (status !== "pending") {
      respondToRentReq(
        {
          requestId: id,
          status,
          propertyId,
          tenantId: requestFromId,
          tenantDocId: tenant.documentId,
          date: new Date().toLocaleDateString(),
          oldRents: tenant?.rentals || [],
          oldRole: tenant.role,
          propertyOwnerId: propertyOwner.documentId,
          oldTenantTo: tenant?.tenantTo,
        },
        {
          onSuccess: () => {
            console.log("success");
            toast.success(
              `The request for "${property.name}" has been ${status} successfully`,
            );
            sendEmail({
              to_name: tenant.userName,
              from_name: propertyOwner.userName,
              message: `your request to rent "${property.name}" from ${propertyOwner.userName} has been  ${status} ${status === "confirmed" ? "successfuly" : "unfortunately"} `,
              to_email: tenant.email,
              from_email: propertyOwner.email,
            });
            setStatus(status);
          },
        },
      );
    } else {
      setStatus(status);
    }
  }

  const handleAction = (action) => {
    setStatus(action);
  };

  const handlePrint = () => {
    window.print(); // Simple print logic, can be customized
  };
  function handleOkay() {
    console.log("start");
    if (noPending) {
      setTempRentRequests((requests) => {
        // console.log("running");
        const changedRequests = requests.map((request) => {
          if (request.id === id) return { ...request, status: status };
          return request;
        });
        console.log(changedRequests);
        if (!changedRequests.length) {
          onCloseModal();
        }
        return changedRequests;
      });
    } else {
      setTempRentRequests((requests) => {
        // console.log("running");
        const filteredRequests = requests.filter(
          (request) => request.id !== id,
        );
        console.log(filteredRequests);
        if (!filteredRequests.length) {
          onCloseModal();
        }
        return filteredRequests;
      });
    }
  }

  return (
    <div className="container mx-auto p-6">
      {!status &&
        (propertyLoading || isLoadingTenant ? (
          <PageLoading />
        ) : (
          <div className="flex ">
            <div className="flex w-[20rem] flex-col  bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                Rent Request
              </h2>
              <p className="mb-4">
                <strong>{tenant.userName}</strong> has sent a request to rent
                the property <strong>{property.name}</strong> for an amount of{" "}
                <strong> GHC {price_offered}</strong>.
              </p>
              <p className="mb-2">
                Actual/Original Price:
                <span className="text-green-600">
                  <strong>{property.price}</strong>
                </span>
              </p>

              <p className="mb-4">
                Please confirm, reject, or leave the request pending for later
                review.
              </p>
              <div className="flex flex-wrap justify-center gap-2 ">
                <button
                  className="rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600"
                  onClick={() => handleRespondToRequest("confirmed")}
                >
                  Confirm
                </button>
                <button
                  className="rounded bg-red-500 px-6 py-2 text-white hover:bg-red-600"
                  onClick={() => handleRespondToRequest("rejected")}
                >
                  Reject
                </button>
                {!noPending && (
                  <button
                    className="rounded bg-gray-300 px-6 py-2 text-gray-800 hover:bg-gray-400"
                    onClick={() => handleAction("pending")}
                  >
                    Leave for Later
                  </button>
                )}
              </div>
            </div>
            <div className="size-[20rem] bg-slate-100 ">
              <RegularCarousel property={property} />
            </div>
          </div>
        ))}

      {status === "confirmed" && (
        <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-green-600">
            Agreement Settled
          </h2>
          <p className="mb-4">
            The rent request for <strong>{property.name}</strong> has been{" "}
            <strong className="text-green-600">confirmed</strong>.
          </p>
          <p className="mb-4">
            Tenant: <strong>{tenant.userName}</strong>
          </p>
          <p className="mb-4">
            Rent Amount: <strong>GHC {price_offered}</strong>
          </p>
          <p className="mb-4">
            Date of Agreement:{" "}
            <strong>{new Date().toLocaleDateString()}</strong>
          </p>
          <div className=" flex w-full justify-between">
            <button
              className="mt-4 flex items-center rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
              onClick={handlePrint}
            >
              <IoPrint className="mr-2 h-5 w-5" />
              Print Agreement
            </button>
            <button
              className="mt-4 flex items-center rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600"
              onClick={handleOkay}
            >
              <FaRegThumbsUp className="mr-2 h-5 w-5" />
              It's Okay
            </button>
          </div>
        </div>
      )}

      {status === "rejected" && (
        <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-red-600">
            Request Rejected
          </h2>
          <p>
            The rent request for <strong>{property.name}</strong> has been{" "}
            <strong>rejected</strong>.
          </p>
          <button
            className="rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600"
            onClick={() => onCloseModal()}
          >
            Okay
          </button>
        </div>
      )}

      {status === "pending" && (
        <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold text-yellow-600">
            Request Pending
          </h2>
          <p>
            The rent request for <strong>{property.name}</strong> is left for
            later review.
          </p>
          <button
            className="rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600"
            onClick={() => handleOkay()}
          >
            Okay
          </button>
        </div>
      )}
    </div>
  );
};

export default RentRequest;
