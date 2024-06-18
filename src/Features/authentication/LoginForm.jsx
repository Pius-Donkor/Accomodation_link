import React, { useEffect, useState } from "react";
import Form from "../../UI/Form";
import { useForm } from "react-hook-form";
import FormRow from "../../UI/FormRow";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { validateEmail } from "../../utils/helper";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import useLogin from "./useLogin";
import { Link, useNavigate } from "react-router-dom";
import useGetUser from "../User/useGetUser";
import toast from "react-hot-toast";
import { updateUser } from "../../Services/apiUser";

export default function LoginForm() {
  const { login, loginError, isLoggingIn } = useLogin();
  
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const verifyEmail = (value) => validateEmail(value) || "invalid email";

  function onSubmit(data) {
    console.log(data);
    login(data, {
      onSuccess: async () => {
        reset();
        toast.success("login successfully done");
        navigate("/");
      },
    });
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
          disabled={isLoggingIn}
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
        <Input
          field={"password"}
          disabled={isLoggingIn}
          register={register}
          type="password"
        />
      </FormRow>
      <FormRow childElement="button">
        <div className="mt-4 flex w-full flex-col items-center gap-3   ">
          <Link
            to="/forgotpassword"
            className=" text-[#4242ad] transition-colors  duration-300 hover:text-[blue] "
          >
            Forgot password ?
          </Link>
          <Button disable={isLoggingIn} type="submit">
            Login
          </Button>
        </div>
      </FormRow>
    </Form>
  );
}
