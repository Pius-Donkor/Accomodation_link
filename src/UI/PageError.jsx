import React from "react";
import Button from "./Button";

export default function PageError({ errorMessage }) {
  function reload() {
    window.location.reload();
  }
  return (
    <div className="mt-[6rem] flex h-[90vh] w-full flex-col items-center justify-center gap-2 border ">
      <p className="rounded-md bg-[#dbb3b3] p-1 text-center text-5xl text-[#da4848] ">
        {errorMessage} 😭🤦‍♂️{" "}
      </p>

      <Button onclick={reload}>Retry</Button>
    </div>
  );
}
