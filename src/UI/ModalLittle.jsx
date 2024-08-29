import { cloneElement, createContext, useState } from "react";

const ModalLittleContext = createContext();
export default function ModalLittle({ children }) {
  const [isModalOpened, setModalOpened] = useState("");

  return (
    <ModalLittleContext.Provider value={{ isModalOpened, setModalOpened }}>
      {children}
    </ModalLittleContext.Provider>
  );
}

function OpenModalLittle({ children, onClick = () => {} }) {
  return <>{cloneElement(children, { onClick: () => onClick() })}</>;
}
