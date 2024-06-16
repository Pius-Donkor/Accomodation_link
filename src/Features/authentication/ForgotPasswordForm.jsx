import Form from "../../UI/Form";
import { useForm } from "react-hook-form";
import FormRow from "../../UI/FormRow";
import Input from "../../UI/Input";
import { validateEmail } from "../../utils/helper";
import { MdEmail } from "react-icons/md";
import useLogin from "./useLogin";
import { useNavigate } from "react-router-dom";
import useForgotPassword from "./useForgotPassword";
import Button from "../../UI/Button";
import toast from "react-hot-toast";
import useGetUser from "../User/useGetUser";

export default function ForgotPasswordForm() {
  const { isResetting, resettingError, resetPassword } = useForgotPassword();
  const { userData } = useGetUser();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm();

  const verifyEmail = (value) => validateEmail(value) || "invalid email";

  function onSubmit(data) {
    resetPassword(data.email, {
      onSuccess: () => {
        toast.success(
          "A link has been sent to your Email , please visit to reset your password ",
        );

        reset();
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
          disabled={isResetting}
          placeholder="eg. Jon@gmail.com"
          validate={verifyEmail}
          field={"email"}
          register={register}
          type="email"
        />
      </FormRow>
      <FormRow childElement="button">
        <div className="mt-4 flex w-full flex-col items-center gap-3   ">
          <Button disable={isResetting} type="submit">
            reset
          </Button>
        </div>
      </FormRow>
    </Form>
  );
}
