import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProperty as updatePropertyAPI } from "../../Services/apiProperties";
import toast from "react-hot-toast";

export default function useUpdateProperties() {
  const queryClient = useQueryClient();
  const {
    isPending: isUpdating,
    isError: isUpdateError,
    mutate: updateProperty,
  } = useMutation({
    mutationFn: (data) => updatePropertyAPI(data),
    mutationKey: ["properties"],
    onSuccess: () => {
      queryClient.invalidateQueries(["properties"]);
    },
    onError: (error) => {
      toast.error(
        "Sorry could not  perform task on this listing, check your internet connection",
      );
    },
  });

  return { isUpdating, isUpdateError, updateProperty };
}
