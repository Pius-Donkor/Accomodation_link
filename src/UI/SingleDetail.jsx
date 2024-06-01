import React from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { BiDetail } from "react-icons/bi";

export default function SingleDetail({ title, value, type = "short" }) {
  const styles = {
    short: {
      container:
        "inline-flex items-center gap-1 rounded-3xl bg-slate-50 px-2 py-1 shadow-md ",
      iconStyle: " rounded-full bg-[#bdf3bd] p-1 text-4xl text-[#32be32]  ",
      titleStyle: " text-xl font-semibold  ",
      valueStyle: " text-lg",
    },
    long: {
      container:
        "  inline-flex items-center gap-1 rounded-3xl  px-2 py-1 shadow-md  flex-wrap  ",
      iconStyle: " rounded-full bg-[#c7d1c7] p-1 text-4xl  block ",
      titleStyle: " text-xl font-semibold block ",
      valueStyle: " text-lg text-wrap text-center ",
    },
  };
  return (
    <div className={styles[type].container}>
      {type === "short" ? (
        <IoCheckmarkCircle className={styles[type].iconStyle} />
      ) : (
        <BiDetail className={styles[type].iconStyle} />
      )}
      <p className={styles[type].titleStyle}>{title} :</p>
      <span className=" text-lg"> {value}</span>
    </div>
  );
}
