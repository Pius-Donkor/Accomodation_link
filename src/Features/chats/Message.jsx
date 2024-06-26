import React from "react";
import ModalLittle from "../../UI/ModalLittle";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function Message({ messageData, currentUserId }) {
  const { senderId, content, timestamp } = messageData;
  return (
    <>
      {senderId === currentUserId ? (
        <li className="flex flex-col items-end ">
          <span className="group relative inline-flex flex-col rounded bg-green-600 px-4 py-2 text-white transition-all duration-200">
            <div className="absolute left-[-1.2rem] top-[8px] hidden transition-all duration-200 group-hover:block ">
              <ModalLittle buttonBg="greenish">
                <div className="flex flex-col border border-x-slate-300 border-b-transparent border-t-slate-300 text-black ">
                  <button className=" flex  items-center gap-1 border-b-2 border-b-slate-300 px-1 hover:bg-slate-200 ">
                    <MdDelete /> Delete
                  </button>
                  <button className="  flex items-center gap-1 px-1 hover:bg-slate-200  ">
                    <MdEdit /> Edit
                  </button>
                </div>
              </ModalLittle>
            </div>
            {content}
          </span>
        </li>
      ) : (
        //  Use `justify-start` for received messages
        <li className="flex flex-col items-start ">
          <span className="inline-flex flex-col  rounded bg-gray-300 px-4 py-2 text-black">
            {content}
          </span>
        </li>
      )}
    </>
  );
}
