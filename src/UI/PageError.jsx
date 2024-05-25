import React from "react";

export default function PageError({ errorMessage }) {
  return (
    <div className="mt-[6rem] flex h-[90vh] w-[100%] items-center justify-center border ">
      <p className="rounded-md bg-[#dbb3b3] p-1 text-center text-5xl text-[#da4848] ">
        {errorMessage} 😭🤦‍♂️{" "}
      </p>
    </div>
  );
}
