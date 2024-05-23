import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { MdOutlineClose } from "react-icons/md";
import { createPortal } from "react-dom";

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
  if (open !== openName) return null;
  return createPortal(
    //overlay
    <div className=" fixed left-0 top-0 z-[1500] h-[100vh] w-[100%] bg-[#ffffff4f] backdrop-blur-md">
      {/* modal window */}
      <div className=" absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md shadow-md ">
        <button
          className=" absolute left-3 top-3 translate-x-[0.8rem] p-1"
          onClick={close}
        >
          {<MdOutlineClose className="text-[2rem]" />}
        </button>
        <div> {cloneElement(children, { onCloseModal: close })} </div>
      </div>
    </div>,
    document.body,
  );
}

function Open({ children, openName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(openName) });
}

Modal.Open = Open;
Modal.Window = Window;
