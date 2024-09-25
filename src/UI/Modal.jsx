import React, {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { MdOutlineClose } from "react-icons/md";
import { createPortal } from "react-dom";
import useOutsideClick from "../hooks/useOutsideClick";

const ModalContext = createContext();
export default function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = setOpenName;
  const close = () => setOpenName("");
  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Window({ children, openName: open }) {
  const { close, openName } = useContext(ModalContext);
  const { ref } = useOutsideClick(close);
  if (open !== openName) return null;
  return createPortal(
    //overlay
    <div className=" fixed left-0 top-0 z-[1500] h-[100vh] w-[100%] bg-[#ffffff4f] backdrop-blur-md transition-all">
      {/* modal window */}
      <div className=" absolute left-[50%] top-[50%] inline-flex translate-x-[-50%] translate-y-[-50%] rounded-md  ">
        <button
          className=" absolute left-0 top-0 translate-x-[0.8rem] p-1"
          onClick={close}
        >
          {<MdOutlineClose className="text-[2rem]" />}
        </button>
        <div ref={ref}> {cloneElement(children, { onCloseModal: close })} </div>
      </div>
    </div>,
    document.body,
  );
}

function Open({ children, openName, isButton = true, preOpened = false }) {
  const { open } = useContext(ModalContext);
  useEffect(() => {
    if (preOpened) open(openName);
  }, []);
  if (isButton)
    return cloneElement(children, { onClick: () => open(openName) });
  return <div>{cloneElement(children, { onClick: () => open(openName) })}</div>;
}

Modal.Open = Open;
Modal.Window = Window;
