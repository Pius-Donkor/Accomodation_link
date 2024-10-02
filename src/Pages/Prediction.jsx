import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useGetProperty from "../Features/properties/useGetProperty";
import PageLoading from "../UI/PageLoading";
import PageError from "../UI/PageError";
import RegularCarousel from "../UI/RegularCarousel";
import BtnLoadingSpinner from "../UI/BtnLoadingSpinner";
import HomeBack from "../UI/HomeBack";
import { cleanAndFormatCurrency } from "../utils/helper";

const Prediction = () => {
  const { id } = useParams();
  const [futureYear, setFutureYear] = useState("2030");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  // console.log(loading);
  const {
    property: listing,
    propertyError,
    propertyLoading,
  } = useGetProperty(id);

  const handleYearChange = (e) => {
    setFutureYear(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://accomodation-link.onrender.com/estimate-future-price?future_year=${futureYear}`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(listing),
        },
      );

      // Check if the response is ok (status in the range 200-299)
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      console.log(data);
      setPrediction(data);
    } catch (error) {
      console.error("Error fetching future price:", error);
    } finally {
      setLoading(false); // Ensure loading state is set back to false
    }
  };

  if (propertyLoading) return <PageLoading />;
  if (propertyError) return <PageError errorMessage={propertyError.message} />;
  return (
    <div className=" relative flex h-[100dvh] w-full items-center justify-center p-6">
      <div className="absolute left-2 top-2">
        <HomeBack />{" "}
      </div>
      <div className=" flex  rounded-lg bg-white p-2  shadow-lg">
        <div className="flex w-[30rem] flex-col items-center bg-slate-100 ">
          <h2 className="mb-4 text-2xl font-bold">
            {listing?.name || "Property"}
          </h2>

          {/* Listing Images */}
          <div className="size-[25rem] bg-slate-200 p-1">
            <RegularCarousel property={listing} />
          </div>
        </div>

        {/* Other Listing Data */}
        <div className=" flex w-[25rem] flex-col justify-center bg-slate-200  px-2 ">
          {/* Listing Description */}
          <p className="mb-4">
            {listing?.description || "No description available."}
          </p>
          <ul className="mb-4 ml-5 list-disc">
            <li>
              <strong>Location:</strong> {listing?.location || "N/A"}
            </li>
            <li>
              <strong>Price:</strong>{" "}
              {cleanAndFormatCurrency(listing?.price) || "N/A"}
            </li>
            <li>
              <strong>Size:</strong> {listing?.size || "N/A"}
            </li>
            <li>
              <strong>Bedrooms:</strong> {listing?.bedrooms || "N/A"}
            </li>
            <li>
              <strong>Bathrooms:</strong> {listing?.bathrooms || "N/A"}
            </li>
            <li>
              <strong>Year Built:</strong> {listing?.year_built || "N/A"}
            </li>
          </ul>
        </div>

        <div className="flex  flex-col justify-center gap-6 bg-slate-100 ">
          {/* Future Year Selection */}
          <div className="">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Select Future Year for Price Prediction:
            </label>
            <input
              type="number"
              value={futureYear}
              onChange={handleYearChange}
              className="w-full rounded-md border px-4 py-2"
              min="2024"
              max="2050"
              placeholder="Enter a future year"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              onClick={handleSubmit}
              className="rounded-md bg-green-600 px-6 py-2 text-white hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Predicting..." : "Predict Future Price"}
            </button>
          </div>

          {/* Display Prediction Result */}
          {loading && (
            <div className="flex h-[5rem] w-full animate-pulse items-center justify-center rounded-md bg-gray-300 p-4">
              <BtnLoadingSpinner />
            </div>
          )}
          {prediction && (
            <>
              <div className="mt-6 rounded-md bg-gray-100 p-4">
                <h3 className="text-lg font-bold">Prediction Result:</h3>
                <p className="text-lg ">
                  Predicted Price for {futureYear}:{"  "}
                  <span className="font-bold text-green-600 ">
                    {cleanAndFormatCurrency(prediction.estimated_price)}
                  </span>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prediction;
