import React from "react";

export default function DashboardItem({
  Icon,
  heading,
  value,
  isList = false,
  iconColor = "text-red-800",
  iconBackgroundColor = "bg-red-200",
}) {
  return isList ? (
    <></>
  ) : (
    <div className=" flex h-[12rem] items-center gap-8 rounded-lg bg-white px-16 py-4  shadow-sm ">
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-full ${iconBackgroundColor} `}
      >
        <Icon className={`text-3xl ${iconColor}`} />
      </span>
      <div>
        <h2 className="text-lg font-medium  ">{heading}</h2>
        <p className="text-3xl">{value}</p>
      </div>
    </div>
  );
}
