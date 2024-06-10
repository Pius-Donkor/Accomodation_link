import useGetProperties from "../Features/properties/useGetProperties";
import { useSearchParams } from "react-router-dom";
import { useFilterContext } from "./FilterState";
import { moneyToNumber } from "../utils/helper";

export default function useFilterSort() {
  const { properties, propertiesError, isLoading } = useGetProperties();
  const [searchParams] = useSearchParams();
  const sortParameter = searchParams.get("sortBy");
  const {
    state: { priceRange, rating, rentType },
  } = useFilterContext();
  let filteredProperties;
  let sortedProperties;

  if (priceRange.min || priceRange.max || rating.min || rating.max) {
    filteredProperties = properties.slice().filter((property) => {
      const priceInRange =
        (!priceRange.min || moneyToNumber(property.price) >= priceRange.min) &&
        (!priceRange.max || moneyToNumber(property.price) <= priceRange.max);
      const ratingInRange =
        (!rating.min || property.rating >= rating.min) &&
        (!rating.max || property.rating <= rating.max);
      return priceInRange && ratingInRange;
    });
  } else {
    filteredProperties = properties.slice();
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
  } else {
    sortedProperties = filteredProperties.slice();
  }

  return { sortedProperties, propertiesError, isLoading };
}
