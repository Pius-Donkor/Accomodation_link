import React, { useState } from "react";

function SelectWithInput({
  type = "text",
  register = () => {},
  required = "This field is required",
  field,
  disabled = false,
  validate = () => {},
  placeholder = "",
  options = [],
}) {
  return (
    <>
      <input
        className=" text-md min-w-[15rem] rounded-3xl bg-[#2b28289a] px-2 py-1 text-[white] shadow-md outline-none"
        type={type}
        id={field}
        {...register(field, { required: required, validate: validate })}
        disabled={disabled}
        placeholder={placeholder}
        name={field}
        list={field + "options"}
      />
      <datalist className="text-2xl" id={field + "options"}>
        {options.map((option, index) => (
          <option value={option} key={index} className="text-2xl" />
        ))}
      </datalist>
    </>
  );
}

export default SelectWithInput;
