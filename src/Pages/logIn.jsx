import React from "react";
import AuthBackground from "../UI/AuthBackground";
import LoginForm from "../Features/authentication/LoginForm";

export default function Login() {
  return (
    <AuthBackground heading="Login">
      <LoginForm />
    </AuthBackground>
  );
}
