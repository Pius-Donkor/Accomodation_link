import React from "react";
import Form from "../../UI/Form";
import { useForm } from "react-hook-form";
import FormRow from "../../UI/FormRow";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { validateEmail } from "../../utils/helper";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";

export default function LoginForm() {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const verifyEmail = (value) => validateEmail(value) || "invalid email";

  function onSubmit(data) {
    console.log(data);
    reset();
  }
  function onError(errors) {
    console.log(errors);
  }
  return (
    <Form onSubmit={onSubmit} onError={onError} handleSubmit={handleSubmit}>
      <FormRow
        icon={{ icon: MdEmail }}
        field="email"
        error={errors?.email?.message}
      >
        <Input
          placeholder="eg. Jon@gmail.com"
          validate={verifyEmail}
          field={"email"}
          register={register}
          type="email"
        />
      </FormRow>
      <FormRow
        icon={{ icon: RiLockPasswordFill }}
        field="password"
        error={errors?.password?.message}
      >
        <Input field={"password"} register={register} type="password" />
      </FormRow>
      <FormRow childElement="button">
        <div className="mt-4 flex w-full justify-center ">
          <Button type="submit"> Login </Button>
        </div>
      </FormRow>
    </Form>
  );
}
