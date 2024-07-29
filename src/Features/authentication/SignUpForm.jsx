import React from "react";
import Form from "../../UI/Form";
import FormRow from "../../UI/FormRow";
import Input from "../../UI/Input";
import { useForm } from "react-hook-form";
import { CiUser } from "react-icons/ci";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaUserTag } from "react-icons/fa6";
import Button from "../../UI/Button";
import { validatePhoneNumber, validateEmail } from "../../utils/helper";
import Select from "../../UI/Select";
import useSignUp from "./useSignUp";
import toast from "react-hot-toast";

export default function SignUpForm({ userId, user }) {
  const { signUp, isSigning } = useSignUp();
  const {
    handleSubmit,
    getValues,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const verifyPhoneNumber = (value) =>
    validatePhoneNumber(value) || "enter the correct phone number";
  const verifyPassword = (value) =>
    getValues().password === value || "Both passwords should be identical";
  const verifyEmail = (value) => validateEmail(value) || "invalid email";

  function onSubmit(data) {
    console.log(data);
    const {
      email,
      location,
      name,
      role,
      password,
      phone_contact,
      whatsApp_contact,
    } = data;
    signUp(
      {
        userId,
        email,
        location,
        userName: name,
        role,
        password,
        contact: phone_contact,
        whatsAppContact: whatsApp_contact,
        documentId: user?.documentId,
        oldPassword: user?.password,
      },
      {
        onSuccess: () => {
          if (userId)
            return toast.success("your data has been edited successfully");
          toast.success("you have been signed up successfully");
          reset();
        },
      },
    );
  }
  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={onSubmit} onError={onError} handleSubmit={handleSubmit}>
      <FormRow
        icon={{ icon: CiUser }}
        field="name"
        error={errors?.name?.message}
      >
        <Input
          disabled={isSigning}
          field={"name"}
          placeholder="eg. Jon Carter"
          register={register}
          type="text"
          defaultValue={user?.userName}
        />
      </FormRow>
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
          disabled={isSigning}
          defaultValue={user?.email}
        />
      </FormRow>
      <FormRow
        icon={{ icon: FaUserTag }}
        field="role"
        error={errors?.role?.message}
      >
        <Select
          field={"role"}
          register={register}
          defaultValue={user?.role}
          disabled={isSigning}
        >
          <option
            className=" hover:bg-slate-50  hover:text-slate-800"
            value="regular_user"
          >
            Regular user
          </option>
          <option value="property_owner">Property owner </option>
        </Select>
      </FormRow>

      <FormRow
        icon={{ icon: RiLockPasswordFill }}
        field="password"
        error={errors?.password?.message}
      >
        <Input
          field={"password"}
          register={register}
          type="password"
          disabled={isSigning}
          defaultValue={user?.password}
        />
      </FormRow>
      <FormRow
        icon={{ icon: RiLockPasswordFill }}
        field="repeat_password"
        error={errors?.repeat_password?.message}
      >
        <Input
          field={"repeat_password"}
          validate={verifyPassword}
          register={register}
          type="password"
          disabled={isSigning}
          defaultValue={user?.password}
        />
      </FormRow>
      <FormRow
        icon={{ icon: IoLocationSharp }}
        field="location"
        error={errors?.location?.message}
      >
        <Input
          field={"location"}
          placeholder="eg sunyani"
          register={register}
          type="text"
          disabled={isSigning}
          defaultValue={user?.location}
        />
      </FormRow>
      <FormRow
        icon={{ icon: FaPhoneAlt }}
        field="phone_contact"
        error={errors?.phone_contact?.message}
      >
        <Input
          field={"phone_contact"}
          validate={verifyPhoneNumber}
          register={register}
          type="text"
          disabled={isSigning}
          defaultValue={user?.contact}
        />
      </FormRow>
      <FormRow
        icon={{ icon: FaWhatsapp }}         
        field="whatsApp_contact"
        error={errors?.phone_contact?.message}
      >
        <Input
          field={"whatsApp_contact"}
          validate={verifyPhoneNumber}
          register={register}
          type="text"
          disabled={isSigning}
          defaultValue={user?.whatsAppContact}
        />
      </FormRow>
      <FormRow childElement="button">
        <div className="mt-4 flex w-full  justify-between ">
          {isSigning && (
            <p>
              {userId ? "editing your detail..." : "signing up please wait..."}
            </p>
          )}
          <Button disabled={isSigning} type="submit">
            {userId ? "Edit user" : "Sign Up"}{" "}
          </Button>
        </div>
      </FormRow>
    </Form>
  );
}
