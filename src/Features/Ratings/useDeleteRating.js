import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import { deleteRating } from "../../Services/apiRatings";

export default function useDeleteRating() {
  const queryClient = useQueryClient();
  const {
    isPending: isDeleting,
    mutate: deletePropertyRating,
    error: deleteRatingError,
  } = useMutation({
    mutationFn: deleteRating,
    mutationKey: ["ratings"],
    onSuccess: (_, ratingId) => {
      console.log(ratingId);
      queryClient.invalidateQueries(["ratings", ratingId]); // Invalidate the specific property's
      toast.success("rating removed successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isDeleting, deletePropertyRating, deleteRatingError };
}
