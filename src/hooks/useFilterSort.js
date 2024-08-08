import useGetProperties from "../Features/properties/useGetProperties";
import { useSearchParams } from "react-router-dom";
import { useFilterContext } from "./FilterState";
import { moneyToNumber } from "../utils/helper";
import useGetUser from "../Features/User/useGetUser";
import useGetAllRatings from "../Features/Ratings/useGetAllRatings";
import { useEffect, useState } from "react";

export default function useFilterSort(isUser) {
  const { properties, propertiesError, isLoading } = useGetProperties();
  const { allRatings } = useGetAllRatings();
  // const [fromUser, setFromUser] = useState(null);
  const { userData } = useGetUser();
  const [searchParams] = useSearchParams();
  const sortParameter = searchParams.get("sortBy");
  const {
    state: { priceRange, rating, rentType },
  } = useFilterContext();
  const [newProperties, setNewProperties] = useState([]);
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
  }, [allRatings]);

  let propertiesType = isUser
    ? newProperties
        .slice()
        .filter((property) => property?.userId === userData?.userId) || []
    : newProperties;
  let filteredProperties;
  let sortedProperties;
  // add ratings to the properties

  // useEffect(() => {
  //   setFromUser(isUser);
  // }, [isUser]);
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
      let rentTypeIn;
      if (rentType === "any") rentTypeIn = property.rentType;
      if (rentType === "home rent") rentTypeIn = property.rentType === rentType;
      if (rentType === "hostel rent")
        rentTypeIn = property.rentType === rentType;

      return priceInRange && ratingInRange;
    });
  } else {
    filteredProperties = propertiesType.slice();
  }

  if (sortParameter === "all") {
    sortedProperties = filteredProperties.slice();
  } else if (sortParameter === "low-price") {
    sortedProperties = filteredProperties
      .slice()
      .sort((a, b) => moneyToNumber(a.price) - moneyToNumber(b.price));
  } else if (sortParameter === "high-price") {
    sortedProperties = filteredProperties
      .slice()
      .sort((a, b) => moneyToNumber(b.price) - moneyToNumber(a.price));
  } else if (sortParameter === "recent") {
    sortedProperties = filteredProperties
      .slice()
      .sort((a, b) => a.date - b.date);
  } else {
    sortedProperties = filteredProperties.slice();
  }

  return { sortedProperties, propertiesError, isLoading };
}
