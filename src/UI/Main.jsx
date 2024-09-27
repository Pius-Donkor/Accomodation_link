import React, { useEffect, useState } from "react";
import { useDisplayOptionsBar } from "../contexts/DisplayOptionsContext";
import OptionsBar from "./OptionsBar";
import HomeBack from "./HomeBack";
import { useRentRequestContext } from "../contexts/RentRequestContext";
import Modal from "./Modal";
import RentRequestsContainer from "./RentRequestsContainer";

export default function Main({ children }) {
  const [openModal, setOpenModal] = useState(false);
  const { displayOptionsBar } = useDisplayOptionsBar();
  const { userNewRentRequests } = useRentRequestContext();
  const [tempRentRequest, setTempRentRequests] = useState([]);
  useEffect(() => {
    if (tempRentRequest.length) return;
    setTempRentRequests(userNewRentRequests);
    setOpenModal(Boolean(userNewRentRequests.length));
  }, [userNewRentRequests, tempRentRequest]);

  return (
    <main className=" relative flex h-[100vh] w-full flex-col bg-slate-200  p-4 lg:w-[80%] ">
      {displayOptionsBar && <OptionsBar page="user" isUser={true} />}
      <div className={`${displayOptionsBar ? "mt-12" : ""}  `}>
        <HomeBack isColumn={true} />
      </div>
      {userNewRentRequests.length || openModal ? (
        <Modal>
          <Modal.Open
            openName={"receivedRequests"}
            preOpened={tempRentRequest.length}
          >
            <span></span>
          </Modal.Open>
          <Modal.Window openName={"receivedRequests"}>
            <RentRequestsContainer
              tempRentRequest={tempRentRequest}
              setOpenModal={setOpenModal}
              setTempRentRequests={setTempRentRequests}
            />
          </Modal.Window>
        </Modal>
      ) : (
        ""
      )}
      {children}
    </main>
  );
}
