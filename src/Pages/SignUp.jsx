import React from "react";
import AuthBackground from "../UI/AuthBackground";
import SignUpForm from "../Features/authentication/SignUpForm";

export default function SignUp() {
  return (
    <AuthBackground heading="Sign-Up for free">
      <SignUpForm />
    </AuthBackground>
  );
}
