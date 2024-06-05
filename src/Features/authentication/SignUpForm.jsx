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

export default function SignUpForm() {
  const {
    handleSubmit,
    getValues,
    formState: { errors },
    register,
  } = useForm();
  return (
    <Form handleSubmit={handleSubmit}>
      <FormRow
        icon={{ icon: CiUser }}
        field="userName"
        error={errors?.userName?.message}
      >
        <Input field={"userName"} register={register} type="text" />
      </FormRow>
      <FormRow
        icon={{ icon: MdEmail }}
        field="email"
        error={errors?.email?.message}
      >
        <Input field={"email"} register={register} type="email" />
      </FormRow>
      <FormRow
        icon={{ icon: RiLockPasswordFill }}
        field="password"
        error={errors?.password?.message}
      >
        <Input field={"password"} register={register} type="password" />
      </FormRow>
      <FormRow
        icon={{ icon: RiLockPasswordFill }}
        field="repeat_password"
        error={errors?.repeat_password?.message}
      >
        <Input field={"repeat_password"} register={register} type="password" />
      </FormRow>
      <FormRow
        icon={{ icon: IoLocationSharp }}
        field="location"
        error={errors?.location?.message}
      >
        <Input field={"location"} register={register} type="text" />
      </FormRow>
      <FormRow
        icon={{ icon: FaPhoneAlt }}
        field="phone_contact"
        error={errors?.phone_contact?.message}
      >
        <Input field={"phone_contact"} register={register} type="text" />
      </FormRow>
      <FormRow
        icon={{ icon: FaWhatsapp }}
        field="whatsApp_contact"
        error={errors?.phone_contact?.message}
      >
        <Input field={"whatsApp_contact"} register={register} type="text" />
      </FormRow>
    </Form>
  );
}
