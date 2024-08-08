import { useQuery } from "@tanstack/react-query";
import { getRatings } from "../../Services/apiRatings";
export default function useGetRatings(id) {
  const {
    data: ratings = [],
    isLoading: ratingsLoading,
    error: ratingsError,
  } = useQuery({
    queryFn: () => getRatings(id),
    queryKey: ["ratings", id],
  });

  return { ratings, ratingsLoading, ratingsError };
}
