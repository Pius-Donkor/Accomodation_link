import useGetProperties from "../Features/properties/useGetProperties";
import { useSearchParams } from "react-router-dom";
import { useFilterContext } from "./FilterState";
import { moneyToNumber } from "../utils/helper";
import useGetUser from "../Features/User/useGetUser";

export default function useFilterSort(isUser) {
  const { properties, propertiesError, isLoading } = useGetProperties();
  // const [fromUser, setFromUser] = useState(null);
  const { userData } = useGetUser();
  const [searchParams] = useSearchParams();
  const sortParameter = searchParams.get("sortBy");
  const {
    state: { priceRange, rating, rentType },
  } = useFilterContext();
  let propertiesType = isUser
    ? properties
        .slice()
        .filter((property) => property?.userId === userData?.userId) || []
    : properties;
  let filteredProperties;
  let sortedProperties;

  // useEffect(() => {
  //   setFromUser(isUser);
  // }, [isUser]);
  if (priceRange.min || priceRange.max || rating.min || rating.max) {
    filteredProperties = propertiesType.slice().filter((property) => {
      const priceInRange =
        (!priceRange.min || moneyToNumber(property.price) >= priceRange.min) &&
        (!priceRange.max || moneyToNumber(property.price) <= priceRange.max);
      const ratingInRange =
        (!rating.min || property.rating >= rating.min) &&
        (!rating.max || property.rating <= rating.max);
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
  } else {
    sortedProperties = filteredProperties.slice();
  }

  return { sortedProperties, propertiesError, isLoading };
}
