import React, { useEffect } from "react";
import { useDisplayOptionsBar } from "../contexts/DisplayOptionsContext";
import Properties from "../Features/properties/Properties";
import PropertiesCard from "../Features/properties/PropertiesCard";
import Button from "../UI/Button";
import { MdAddHome } from "react-icons/md";
import Modal from "../UI/Modal";
import CreateEditListing from "../Features/UserListings/CreateEditListing";

export default function MyListings() {
  const { setDisplayOptionsBar } = useDisplayOptionsBar();
  useEffect(() => setDisplayOptionsBar(true));
  return (
    <section className="relative mt-8 w-full ">
      <div className="absolute right-4 top-[-4rem]">
        <Modal>
          <Modal.Open isButton={true} openName={"create_listing"}>
            <Button>
              <MdAddHome /> create new listing
            </Button>
          </Modal.Open>
          <Modal.Window openName={"create_listing"}>
            <CreateEditListing />
          </Modal.Window>
        </Modal>
      </div>
      <div className=" flex w-full px-4">
        <div className=" mx-8 h-[80dvh] w-full  overflow-y-auto rounded-lg bg-slate-700 pt-8  ">
          <Properties allowCrud={true} noPadding={true} isUser={true} />
        </div>
      </div>
    </section>
  );
}
