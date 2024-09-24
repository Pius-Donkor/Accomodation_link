import React, { useEffect } from "react";
import AuthBackground from "../UI/AuthBackground";
import LoginForm from "../Features/authentication/LoginForm";
import useGetAuthUser from "../Features/User/useGetAuthUser";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignIn() {
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
    <AuthBackground heading="Login">
      <LoginForm />
    </AuthBackground>
  );
}
