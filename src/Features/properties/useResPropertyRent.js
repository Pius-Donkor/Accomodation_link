import { useMutation, useQueryClient } from "@tanstack/react-query";
import { receiveRequest } from "../../Services/apiRequests";

export default function useResPropertyRent() {
  const queryClient = useQueryClient();
  const {
    mutate: respondToRentReq,
    error: respondingError,
    isPending: isResponding,
  } = useMutation({
    mutationFn: receiveRequest,
    mutationKey: ["rentRequests"],
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return { respondToRentReq, respondingError, isResponding };
}
