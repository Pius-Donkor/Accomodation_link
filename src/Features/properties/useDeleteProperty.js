import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { deleteProperty } from "../../Services/apiProperties";
import toast from "react-hot-toast";

export default function useDeleteProperty() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteListing,
    isPending: isDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteProperty,
    mutationKey: ["properties"],
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("listing has been deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { deleteListing, isDeleting, deleteError };
}
