import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetProperty from "../Features/properties/useGetProperty";

const Prediction = () => {
  const { id } = useParams();
  const [futureYear, setFutureYear] = useState("2030");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

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

      const data = await response.json();
      setPrediction(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching future price:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mx-auto max-w-xl rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-2xl font-bold">{listing?.name}</h2>

        {/* Listing? Images */}
        <div className="mb-4">
          {listing?.image?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={listing?.name}
              className="mb-4 w-full rounded-md"
            />
          ))}
        </div>

        {/* Listing? Description */}
        <p className="mb-4">{listing?.description}</p>

        {/* Display other listing? data */}
        <ul className="mb-4 ml-5 list-disc">
          <li>
            <strong>Location:</strong> {listing?.location}
          </li>
          <li>
            <strong>Price:</strong> {listing?.price}
          </li>
          <li>
            <strong>Size:</strong> {listing?.size}
          </li>
          <li>
            <strong>Bedrooms:</strong> {listing?.bedrooms}
          </li>
          <li>
            <strong>Bathrooms:</strong> {listing?.bathrooms}
          </li>
          <li>
            <strong>Year Built:</strong> {listing?.year_built}
          </li>
        </ul>

        {/* Future Year Selection */}
        <div className="mb-4">
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
        {prediction && (
          <div className="mt-6 rounded-md bg-gray-100 p-4">
            <h3 className="text-xl font-bold">Prediction Result:</h3>
            <p className="text-lg">
              Predicted Price for {futureYear}: ${prediction.price}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Prediction;
