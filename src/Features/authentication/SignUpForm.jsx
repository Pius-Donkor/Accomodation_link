import React from "react";
import Form from "../../UI/Form";
import FormRow from "../../UI/FormRow";
import Input from "../../UI/Input";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const {
    handleSubmit,
    getValues,
    formState: { errors },
    register,
  } = useForm();
  return (
    <Form>
      <FormRow field="userName" error={errors?.userName?.message}>
        <Input field={"userName"} register={register} type="text" />
      </FormRow>
    </Form>
  );
}
