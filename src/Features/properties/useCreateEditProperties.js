import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditProperties } from "../../Services/apiProperties";
import toast from "react-hot-toast";

export default function useCreateEditProperties() {
  const queryClient = useQueryClient();
  const {
    mutate: createEdit,
    error: createEditError,
    isPending: isCreating,
  } = useMutation({
    mutationFn: createEditProperties,
    mutationKey: ["properties"],
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { createEdit, createEditError, isCreating };
}
