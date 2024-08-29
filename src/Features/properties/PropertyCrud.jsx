import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
// import useOutsideClick from "../../hooks/useOutsideClick";
import Button from "../../UI/Button";
import CrudButton from "../../UI/CrudButton";
import Modal from "../../UI/Modal";
import CreateEditListing from "../UserListings/CreateEditListing";
import DeleteWindow from "../../UI/DeleteWindow";
export default function PropertyCrud({ property, handleDelete, isDeleting }) {
  const [displayCrud, setDisplayCrud] = useState(false);
  // const closeCrud = () => setDisplayCrud(false);
  function handleDisplayCrud() {
    setDisplayCrud((prev) => !prev);
  }
  // const { ref } = useOutsideClick(closeCrud);
  return (
    <div className="relative">
      <Button type="transparent" onClick={handleDisplayCrud}>
        <PiDotsThreeOutlineVerticalBold className=" text-xl" />
      </Button>

      {displayCrud && (
        <div className=" absolute right-[-5rem] top-[-0.5rem] z-20 flex w-fit flex-col rounded-sm border border-[#00000046] bg-slate-50 shadow-2xl ">
          <Modal>
            <Modal.Open openName={"edit"}>
              <CrudButton Icon={MdModeEditOutline}>Edit</CrudButton>
            </Modal.Open>
            <Modal.Window openName={"edit"}>
              <CreateEditListing property={property} id={property?.id} />
            </Modal.Window>
            <Modal.Open openName="delete">
              <CrudButton Icon={MdDelete}>Delete</CrudButton>
            </Modal.Open>
            <Modal.Window openName="delete">
              <DeleteWindow
                id={property.id}
                handleDelete={handleDelete}
                isDeleting={isDeleting}
                imageNames={property?.imageNames}
              />
            </Modal.Window>
          </Modal>
        </div>
      )}
    </div>
  );
}
