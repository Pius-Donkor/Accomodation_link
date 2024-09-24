import React, { useEffect } from "react";
import AuthBackground from "../UI/AuthBackground";
import SignUpForm from "../Features/authentication/SignUpForm";
import { useNavigate } from "react-router-dom";
import useGetAuthUser from "../Features/User/useGetAuthUser";
import toast from "react-hot-toast";

export default function SignUp() {
  const navigate = useNavigate();
  const { isUser } = useGetAuthUser();
  useEffect(() => {
    if (isUser) {
      toast.error(
        "you are already logged-in, logout first before switching account",
      );
      navigate("/");
    }
  }, [isUser, navigate]);
  return (
    <AuthBackground heading="Sign-Up for free">
      <SignUpForm />
    </AuthBackground>
  );
}
