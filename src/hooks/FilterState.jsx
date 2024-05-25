import React, { createContext, useContext } from "react";
import { useReducer, useRef } from "react";
const FilterState = createContext();
// Initial state
const initialState = {
  priceRange: {
    min: "",
    max: "",
  },
  rating: {
    min: "",
    max: "",
  },
  rentType: "",
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "SET_PRICE_RANGE":
      return {
        ...state,
        priceRange: {
          ...state.priceRange,
          [action.payload.field]: +action.payload.value,
        },
      };
    case "SET_RATING":
      return {
        ...state,
        rating: {
          ...state.rating,
          [action.payload.field]: +action.payload.value,
        },
      };
    case "SET_RENT_TYPE":
      return {
        ...state,
        rentType: action.payload,
      };
    default:
      return state;
  }
}
export function FilterStateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FilterState.Provider value={{ state, dispatch }}>
      {children}
    </FilterState.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterState);
  if (context === undefined)
    throw new Error("filterCOntext must be used inside filterStateProvider");
  return context;
}
