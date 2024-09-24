import React from "react";
import Button from "./Button";
import FormRow from "./FormRow";
import Input from "./Input";
import { FaTrashAlt } from "react-icons/fa";

export default function MultipleInputs({
  heading,
  addButtonName,
  field,
  errors = "",
  disabled = false,
  placeholder = "",
  register = () => {},
  required = "this field is required",
  type = "text",
  validate = () => {},
  icon = "",
  fields,
  append,
  remove,
  fieldArrayName = "",
  defaultValue,
}) {
  console.log(errors?.[fieldArrayName]?.at(0)?.message);
  return (
    <div className="bg-[#00000017] px-2 py-2 ">
      <h1 className="text-2xl font-bold"> {heading}</h1>
      <Button onClick={() => append("")}> {addButtonName}</Button>
      <div className="flex flex-col gap-4">
        {fields.map((arrayField, index) => (
          <FormRow
            error={errors?.[fieldArrayName]?.at(0)?.message}
            icon={icon}
            field={field + "_" + (index + 1)}
            key={arrayField.id}
          >
            <Input
              defaultValue={defaultValue?.at(index) || ""}
              fieldArrayName={fieldArrayName}
              index={index}
              type={type}
              validate={validate}
              disabled={disabled}
              placeholder={placeholder}
              register={register}
              required={required}
              field={field + "_" + (index + 1)}
            />
            <span role="button" onClick={() => remove(index)}>
              <FaTrashAlt />
            </span>
          </FormRow>
        ))}
      </div>
    </div>
  );
}
