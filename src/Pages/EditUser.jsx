import React, { useEffect } from "react";
import { useDisplayOptionsBar } from "../contexts/DisplayOptionsContext";
import SignUpForm from "../Features/authentication/SignUpForm";
import useGetUser from "../Features/User/useGetUser";

export default function EditUser() {
  const { setDisplayOptionsBar } = useDisplayOptionsBar();
  const { error, isLoading, userData } = useGetUser();
  useEffect(() => setDisplayOptionsBar(false));
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="mt-4 flex h-full  items-center justify-center overflow-y-auto  ">
      <div className="w-fit rounded-md bg-slate-300  p-4  shadow-md  ">
        <SignUpForm user={userData} userId={userData?.userId} />
      </div>
    </div>
  );
}
