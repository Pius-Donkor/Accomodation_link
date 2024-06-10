import React, { useState } from "react";
import Button from "./Button";
import FormRow from "./FormRow";
import Input from "./Input";
import { FaTrashAlt } from "react-icons/fa";

export default function MultipleInputs({
  heading,
  addButtonName,
  field,
  error = "",
  disabled = false,
  placeholder = "",
  register = () => {},
  required = "this field is reqiued",
  type = "text",
  validate = () => {},
  icon = "",
}) {
  const [inputs, setInputs] = useState([1]);
  function handleAddRule() {
    setInputs((prev) => [...prev, prev.length + 1]);
  }

  function deleteInput(inputToDelete) {
    setInputs((prev) => prev.filter((input) => input !== inputToDelete));
  }
  return (
    <div className="bg-[#00000017] py-2 ">
      <h1 className="text-2xl font-bold"> {heading}</h1>
      <Button onClick={handleAddRule}> {addButtonName}</Button>
      <div className="flex flex-col gap-4">
        {inputs.map((input, index) => (
          <FormRow
            error={error}
            icon={icon}
            field={field + "_" + (index + 1)}
            key={input}
          >
            <Input
              type={type}
              validate={validate}
              disabled={disabled}
              placeholder={placeholder}
              register={register}
              required={required}
              field={field + "_" + (index + 1)}
            />
            <span role="button" onClick={() => deleteInput(input)}>
              <FaTrashAlt />
            </span>
          </FormRow>
        ))}
      </div>
    </div>
  );
}
