import useGetProperties from "../Features/properties/useGetProperties";
import { useSearchParams } from "react-router-dom";
import { useFilterContext } from "./FilterState";
import { moneyToNumber } from "../utils/helper";
import useGetUser from "../Features/User/useGetUser";
import useGetAllRatings from "../Features/Ratings/useGetAllRatings";
import { useEffect, useState } from "react";

export default function useFilterSort(isUser, forAdminSection = false) {
  const { properties, propertiesError, isLoading } = useGetProperties();
  const { allRatings } = useGetAllRatings();
  const { userData } = useGetUser();
  const [searchParams] = useSearchParams();
  const sortParameter = searchParams.get("sortBy");

  const {
    state: { priceRange, rating, rentType, searchedLocation },
  } = useFilterContext();

  const [newProperties, setNewProperties] = useState([]);

  // Adding ratings to their corresponding property data
  useEffect(() => {
    if (!properties.length && !allRatings.length) return;

    const ratedProperties = properties.slice().map((property) => {
      let ratings = allRatings.filter(
        (rating) => rating.propertyId === property.id,
      );

      let averageRating =
        ratings.reduce((sum, rating) => (sum += rating.rate), 0) /
          ratings.length || 0;
      return { ...property, averageRating };
    });
    setNewProperties(ratedProperties);
  }, [allRatings, properties]);

  let propertiesType = isUser
    ? newProperties
        .slice()
        .filter((property) => property?.userId === userData?.userId) || []
    : forAdminSection
      ? newProperties
      : newProperties
          .slice()
          .filter((property) => property.status === "accepted");

  let filteredProperties;
  let MediumSortedProperties;
  let sortedProperties;

  // Filtering based on price range, rating, and rent type
  if (
    priceRange.min ||
    priceRange.max ||
    rating.min ||
    rating.max ||
    rentType
  ) {
    filteredProperties = propertiesType.slice().filter((property) => {
      const priceInRange =
        (!priceRange.min || moneyToNumber(property.price) >= priceRange.min) &&
        (!priceRange.max || moneyToNumber(property.price) <= priceRange.max);
      const ratingInRange =
        (!rating.min || property.averageRating >= rating.min) &&
        (!rating.max || property.averageRating <= rating.max);

      // Rent type filtering logic
      let rentTypeIn = true; // Default to true to allow all when "any" is selected or not specified
      if (rentType === "home rent") {
        rentTypeIn = property.rentType === "home rent";
      } else if (rentType === "hostel rent") {
        rentTypeIn = property.rentType === "hostel rent";
      }

      return priceInRange && ratingInRange && rentTypeIn;
    });
  } else {
    filteredProperties = propertiesType.slice();
  }

  // Sorting logic
  if (sortParameter === "all") {
    MediumSortedProperties = filteredProperties.slice();
  } else if (sortParameter === "low-price") {
    MediumSortedProperties = filteredProperties
      .slice()
      .sort((a, b) => moneyToNumber(a.price) - moneyToNumber(b.price));
  } else if (sortParameter === "high-price") {
    MediumSortedProperties = filteredProperties
      .slice()
      .sort((a, b) => moneyToNumber(b.price) - moneyToNumber(a.price));
  } else if (sortParameter === "recent") {
    MediumSortedProperties = filteredProperties
      .slice()
      .sort((a, b) => a.date - b.date);
  } else {
    MediumSortedProperties = filteredProperties.slice();
  }

  sortedProperties = MediumSortedProperties.filter((property) =>
    property.location.toLowerCase().includes(searchedLocation.toLowerCase()),
  );
  return { sortedProperties, propertiesError, isLoading };
}
