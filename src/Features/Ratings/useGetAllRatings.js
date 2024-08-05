import { useQuery } from "@tanstack/react-query";
import { getAllRatings } from "../../Services/apiRatings";

export default function useGetAllRatings() {
  const {
    data: allRatings = [],
    isLoading: isLoadingRating,
    error: ratingError,
  } = useQuery({
    queryFn: getAllRatings,
    queryKey: ["allRatings"],
  });
  return { allRatings, isLoadingRating, ratingError };
}
