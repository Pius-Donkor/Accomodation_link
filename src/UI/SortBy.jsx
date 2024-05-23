import React from "react";
import { useSearchParams } from "react-router-dom";

export default function SortBy() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy" || "");
  function handleSortParam(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <select
      onChange={handleSortParam}
      value={sortBy || "all"}
      className="  flex justify-center gap-1 rounded-sm bg-[#9adf9a] px-2  py-1 text-lg shadow-sm outline-none transition-all hover:bg-green-500 hover:text-slate-100 md:text-lg"
      name="sort"
      id="sort"
    >
      <option className=" text-sm md:text-lg  " value="all">
        All
      </option>
      <option className=" text-sm md:text-lg " value="low-price">
        Low to high Price
      </option>
      <option className=" text-sm md:text-lg " value="high-price">
        High to low Price
      </option>
      <option className=" text-sm md:text-lg " value="recent">
        Most recent
      </option>
    </select>
  );
}
