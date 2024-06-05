import React from "react";
import AuthBackground from "../UI/AuthBackground";
import LoginForm from "../Features/authentication/LoginForm";

export default function LogIn() {
  return (
    <AuthBackground heading="Login">
      <LoginForm />
    </AuthBackground>
  );
}
