import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "../../Services/apiProperties";

export default function useGetProperties() {
  const {
    data: properties = [],
    error: propertiesError,
    isLoading,
  } = useQuery({
    queryFn: getAllProperties,
    queryKey: ["properties"],
  });

  // console.log("Properties:", properties);
  // console.log("Error:", propertiesError);
  // console.log("Is Loading:", isLoading);

  return { properties, propertiesError, isLoading };
}
