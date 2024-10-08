import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserStatus as updateUserStatusApi } from "../../Services/apiUser";
import toast from "react-hot-toast";

export default function useUpdateUserStatus() {
  const queryClient = useQueryClient();
  const {
    isPending: isUpdating,
    isError: isUpdateError,
    mutate: updateUserStatus,
  } = useMutation({
    mutationFn: (data) => updateUserStatusApi(data),
    mutationKey: ["users"],
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
    onError: (error) => {
      toast.error(
        "Sorry could not perform action on this user, check your internet connection" +
          error.message,
      );
    },
  });

  return { isUpdating, isUpdateError, updateUserStatus };
}
