import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setRating } from "../../Services/apiRatings";
import toast from "react-hot-toast";

export default function useSetRatings() {
  const queryClient = useQueryClient();
  const {
    isPending: isRating,
    mutate: rateProperty,
    error: rateError,
  } = useMutation({
    mutationFn: setRating,
    mutationKey: ["ratings"],
    onSuccess: (_, { propertyId }) => {
      queryClient.invalidateQueries(["ratings", propertyId]); // Invalidate the specific property's ratings query
      toast.success("Property rated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isRating, rateProperty, rateError };
}
