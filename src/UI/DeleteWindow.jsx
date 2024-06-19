import React from "react";

export default function DeleteWindow({
  id,
  onCloseModal,
  handleDelete,
  isDeleting,
  imageNames,
  message = "Are you sure you want to delete this property",
}) {
  return (
    <div className=" flex flex-col gap-8  rounded-md bg-slate-50 p-4 text-xl shadow-2xl ">
      <h2 className="mt-8">{message} ?</h2>

      <div className="flex justify-evenly">
        <button
          disabled={isDeleting}
          onClick={() => onCloseModal()}
          className="rounded-md bg-slate-300 px-2 py-1 transition-all duration-300 hover:bg-slate-400 hover:shadow-2xl "
        >
          cancel
        </button>
        <button
          disabled={isDeleting}
          onClick={() => handleDelete({ id, imageNames })}
          className="rounded-md bg-red-400 px-2 py-1 text-white  transition-all duration-300 hover:bg-red-600 hover:shadow-2xl "
        >
          delete
        </button>
      </div>
    </div>
  );
}
