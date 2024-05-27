import "./filterWindow.css";
import FilterInput from "./FilterInput";
import Button from "./Button";
import { useRef } from "react";
import { useFilterContext } from "../hooks/FilterState";

export default function FilterWindow({ onCloseModal }) {
  const isSmallScreen = useRef(window.innerWidth).current < 768;

  const { state, dispatch } = useFilterContext();
  const handleInputChange = (e, type, field) => {
    dispatch({
      type,
      payload: {
        field,
        value: e.target.value,
      },
    });
  };

  const handleRadioChange = (e) => {
    dispatch({
      type: "SET_RENT_TYPE",
      payload: e.target.value,
    });
  };
  function handleDne(e) {
    e.preventDefault();
    onCloseModal();
  }
  return (
    <form className="   mt-[20vh] flex h-[80vh] w-[95%] flex-col gap-8 overflow-auto bg-slate-200 p-8 shadow-md md:mt-0 md:h-full md:min-w-[50rem] ">
      <div className=" flex flex-col items-center gap-4  md:flex-row ">
        <label htmlFor="price-range" className="text-xl font-semibold">
          Price range :
        </label>
        <FilterInput
          onChange={handleInputChange}
          type={"SET_PRICE_RANGE"}
          field="min"
          title={"minimum"}
          name={"price-range"}
          value={state.priceRange.min}
        />
        {isSmallScreen ? <span>&#124;</span> : <span>&#8212;</span>}
        <FilterInput
          onChange={handleInputChange}
          type={"SET_PRICE_RANGE"}
          field="max"
          title={"maximum"}
          name={"price-range"}
          value={state.priceRange.max}
        />
      </div>
      <div className=" flex flex-col items-center gap-4  md:flex-row ">
        <label htmlFor="price-range" className="text-xl font-semibold">
          rating :
        </label>
        <FilterInput
          title={"minimum"}
          type={"SET_RATING"}
          field="min"
          name={"rating"}
          isCurrency={false}
          onChange={handleInputChange}
          value={state.rating.min}
        />
        {isSmallScreen ? <span>&#124;</span> : <span>&#8212;</span>}
        <FilterInput
          title={"maximum"}
          type={"SET_RATING"}
          field="max"
          name={"rating"}
          isCurrency={false}
          onChange={handleInputChange}
          value={state.rating.max}
        />
      </div>

      <div className="flex flex-col gap-4 ">
        <h1 className=" text-2xl font-semibold">Rent type</h1>
        <div className=" flex items-center">
          <label htmlFor="home-rent" className="mr-4 text-lg ">
            Home rent
          </label>
          <input
            type="radio"
            name="rent-type"
            id="home-rent"
            className="h-5 w-5"
            value="home"
            checked={state.rentType === "home"}
            onChange={handleRadioChange}
          />
        </div>
        <div className=" flex items-center">
          <label htmlFor="hostel-rent" className="mr-4 text-lg ">
            Hostel rent
          </label>
          <input
            type="radio"
            name="rent-type"
            id="hostel-rent"
            value="hostel"
            className="h-5 w-5"
            checked={state.rentType === "hostel"}
            onChange={handleRadioChange}
          />
        </div>
        <div className=" flex items-center">
          <label htmlFor="any" className="mr-4 text-lg ">
            Any
          </label>
          <input
            type="radio"
            name="rent-type"
            id="any"
            value="any"
            className="h-5 w-5"
            hecked={state.rentType === "any"}
            onChange={handleRadioChange}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button onclick={handleDne}>Done</Button>
      </div>
    </form>
  );
}
