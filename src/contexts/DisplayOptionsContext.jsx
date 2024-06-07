import React, { useContext, useState } from "react";
import { createContext } from "react";
const OptionsBarContext = createContext();

export default function DisplayOptionsBarProvider({ children }) {
  const [displayOptionsBar, setDisplayOptionsBar] = useState(true);

  return (
    <OptionsBarContext.Provider
      value={{ displayOptionsBar, setDisplayOptionsBar }}
    >
      {children}
    </OptionsBarContext.Provider>
  );
}

export function useDisplayOptionsBar() {
  const context = useContext(OptionsBarContext);
  if (context === undefined)
    throw new Error(
      "OptionsBarContext cannot be used outside OptionsBarContext.Provider ",
    );
  return context;
}
