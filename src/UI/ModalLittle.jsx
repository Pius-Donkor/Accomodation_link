import { cloneElement, createContext, useContext, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import useOutsideClick from "../hooks/useOutsideClick";
const ModalLittleContext = createContext();
export default function ModalLittle({ children }) {
  const [isModalOpened, setModalOpened] = useState("");
  const closeModal = () => setModalOpened("");

  return (
    <ModalLittleContext.Provider
      value={{ isModalOpened, setModalOpened, closeModal }}
    >
      {children}
    </ModalLittleContext.Provider>
  );
}

function OpenModalLittle({ children, openName = "" }) {
  const { setModalOpened } = useContext(ModalLittleContext);

  return (
    <>{cloneElement(children, { onClick: () => setModalOpened(openName) })}</>
  );
}

function ModalLittleWindow({ children, openName = "", position = "" }) {
  const { closeModal, isModalOpened } = useContext(ModalLittleContext);
  const { ref } = useOutsideClick(closeModal);

  if (isModalOpened !== openName) return null;
  return (
    <div
      ref={ref}
      className={` ${position}  flex w-fit flex-col items-center justify-center rounded-md bg-[#b3b3b38a] p-2 `}
    >
      <button
        onClick={() => closeModal()}
        className="mb-1 self-start rounded-full bg-green-100 p-1 "
      >
        <MdOutlineClose className=" text-lg " />
      </button>
      <div>{cloneElement(children, { onClose: () => closeModal() })}</div>
    </div>
  );
}

ModalLittle.OpenModalLittle = OpenModalLittle;
ModalLittle.ModalLittleWindow = ModalLittleWindow;
