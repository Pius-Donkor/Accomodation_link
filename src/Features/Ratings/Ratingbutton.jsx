import React, { useState } from "react";
import useGetUser from "../User/useGetUser";
import toast from "react-hot-toast";

const ratingProps = [
  {
    name: "Excellent",
    bg_color: "bg-green-500",
    hoverBg_color: "hover:bg-green-600",
  },
  {
    name: "Very Good",
    bg_color: "bg-green-400",
    hoverBg_color: "hover:bg-green-500",
  },
  {
    name: "Good",
    bg_color: "bg-yellow-400",
    hoverBg_color: "hover:bg-yellow-500",
  },
  {
    name: "Not bad",
    bg_color: "bg-yellow-300",
    hoverBg_color: "hover:bg-yellow-400",
  },
  {
    name: "Bad",
    bg_color: "bg-red-500",
    hoverBg_color: "hover:bg-red-600",
  },
];

const RatingButton = ({ rateProperty, isRating, propertyId, ratings }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { userData } = useGetUser();
  const oldRattingId = ratings
    ?.filter((rating) => rating?.userId === userData?.userId)
    ?.at(0)?.ratingId;
  const handleButtonClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  function handleRating(rateValue) {
    console.log(rateValue);
    rateProperty(
      {
        ratingId: oldRattingId || null,
        rate: rateValue,
        propertyId: propertyId,
        userId: userData.userId,
      },
      {
        onSuccess: () => {
          handleButtonClick();
        },
      },
    );
  }

  return (
    <div className={`relative inline-block ${isRating ? "opacity-35" : ""}`}>
      <button
        disabled={isRating}
        onClick={handleButtonClick}
        className="rounded-3xl bg-[#b33479] px-3 py-1 text-white hover:bg-[#ee3b9d] focus:outline-none"
      >
        Rate Property
      </button>
      {isPopupVisible && (
        <div className="absolute right-[-12rem] top-[-10rem] z-20 mt-2 w-[12rem] rounded border border-gray-300 bg-white p-4 shadow-lg">
          <h3 className="mb-2 text-center text-lg font-semibold ">
            How was your rent experience?
          </h3>
          <ul className="space-y-2">
            {ratingProps.map((prop, i) => (
              <li key={prop.name}>
                <button
                  disabled={isRating}
                  onClick={() => handleRating(5 - i)}
                  className={`w-full rounded ${prop.bg_color} px-4 py-2 text-left text-white transition-colors duration-300 ${prop.hoverBg_color}`}
                >
                  {prop.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RatingButton;
