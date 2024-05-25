import React from "react";
import LoadingPropertyCard from "./LoadingPropertyCard";

export default function LoadingProperties() {
  return (
    <div className=" mt-16 flex w-[100%] flex-col items-center justify-center gap-12 px-14 py-20">
      <div className="flex w-[100%] flex-row flex-wrap items-center justify-center gap-12 ">
        {Array.from({ length: 6 }, (_, i) => (
          <LoadingPropertyCard />
        ))}
      </div>
    </div>
  );
}
