import React from "react";
import TableRow from "../../UI/TableRow";
import TableData from "../../UI/TableData";
import Button from "../../UI/Button";
import useUpdateProperties from "./useUpdateProperties";
import toast from "react-hot-toast";
import ModalLittle from "../../UI/ModalLittle";
import { FaHouseLock } from "react-icons/fa6";
import { BsFillHouseCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
export default function PropertiesCard({ property }) {
  const navigate = useNavigate();
  const { isUpdateError, isUpdating, updateProperty } = useUpdateProperties();
  const { name, price, status, rentStatus, location, image, id } = property;

  function handleUpdateProperty(task, messageType) {
    console.log("working");
    updateProperty(
      {
        ...task,
        id,
      },
      {
        onSuccess: () => {
          toast.success(`property has been ${messageType} successfully`);
        },
      },
    );
  }
  return (
    <TableRow>
      <TableData withFlex={true}>
        <img
          className="mb-2 w-12"
          onClick={() => navigate(`/propertyDetails/${id}`)}
          src={image.at(0)}
          alt="dummy"
        />
        <p className="whitespace-normal">{name}</p>
      </TableData>
      <TableData>
        <p className="whitespace-normal">{location}</p>
      </TableData>
      <TableData>{price}</TableData>
      <TableData>{status}</TableData>
      <TableData>{rentStatus}</TableData>
      <TableData withFlex={true} hasButtons={true}>
        {status === "pending" ? (
          <>
            <Button
              onclick={() =>
                handleUpdateProperty({ status: "rejected" }, "rejected")
              }
              type="reddish"
            >
              Reject
            </Button>
            <Button
              onclick={() =>
                handleUpdateProperty({ status: "accepted" }, "approved")
              }
              type="blue"
            >
              Approve
            </Button>
          </>
        ) : (
          (status === "rejected" && (
            <Button
              onclick={() =>
                handleUpdateProperty({ status: "accepted" }, "approved")
              }
              type="blue"
            >
              Approve
            </Button>
          )) ||
          (status === "accepted" && (
            <Button
              onclick={() =>
                handleUpdateProperty({ status: "rejected" }, "rejected")
              }
              type="reddish"
            >
              Reject
            </Button>
          ))
        )}

        <ModalLittle>
          <ModalLittle.OpenModalLittle openName={`rentStatus${id}`}>
            <Button type="green">Set Rental status</Button>
          </ModalLittle.OpenModalLittle>
          <ModalLittle.ModalLittleWindow
            position="absolute bottom-[-3.3rem] right-2  "
            openName={`rentStatus${id}`}
          >
            <div className="flex flex-col gap-1">
              <Button
                onclick={() =>
                  handleUpdateProperty(
                    {
                      rentStatus: "rented",
                    },
                    "Rented",
                  )
                }
                type="nav"
              >
                <FaHouseLock className="mr-1 text-lg" /> Rented
              </Button>
              <Button
                onclick={() =>
                  handleUpdateProperty(
                    {
                      rentStatus: "available",
                    },
                    "Available",
                  )
                }
                type="nav"
              >
                <BsFillHouseCheckFill className="mr-1 text-lg" /> Available
              </Button>
            </div>
          </ModalLittle.ModalLittleWindow>
        </ModalLittle>

        {/* <Button
          onclick={() =>
            handleUpdateProperty(
              {
                rentStatus: rentStatus === "available" ? "rented" : "available",
              },
              `set to ${rentStatus === "available" ? "rented" : "available"}`,
            )
          }
          type="green"
        >
          Set Rental status
        </Button> */}
      </TableData>
    </TableRow>
  );
}
