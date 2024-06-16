import React from "react";
import AuthBackground from "../UI/AuthBackground";
import ForgotPasswordForm from "../Features/authentication/ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <AuthBackground heading="Reset">
      <ForgotPasswordForm />
    </AuthBackground>
  );
}
