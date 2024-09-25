import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateRentRequest as createUpdateRentRequestApi } from "../../Services/apiRequests";
import toast from "react-hot-toast";

export default function useReqPropertyRent() {
  const queryClient = useQueryClient();
  const {
    mutate: createUpdateRentRequest,
    error: createUpdateRentRequestError,
    isPending: isProcessingRental,
  } = useMutation({
    mutationFn: createUpdateRentRequestApi,
    mutationKey: ["rentRequests"],
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    createUpdateRentRequest,
    createUpdateRentRequestError,
    isProcessingRental,
  };
}
