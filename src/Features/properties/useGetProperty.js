import { useQuery } from "@tanstack/react-query";
import { getProperty } from "../../Services/apiProperties";

export default function useGetProperty(id) {
  const {
    data: property = {},
    isLoading: propertyLoading,
    error: propertyError,
  } = useQuery({
    queryFn: () => getProperty(id),
    queryKey: ["property"],
  });

  return { property, propertyLoading, propertyError };
}
