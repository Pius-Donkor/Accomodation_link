import React, { useEffect } from "react";
import { useDisplayOptionsBar } from "../contexts/DisplayOptionsContext";
import SignUpForm from "../Features/authentication/SignUpForm";

export default function EditUser() {
  const { setDisplayOptionsBar } = useDisplayOptionsBar();
  useEffect(() => setDisplayOptionsBar(false));
  return (
    <div className="mt-4 flex h-full w-full items-center justify-center overflow-y-auto px-4 ">
      <SignUpForm id={"1"} />
    </div>
  );
}
