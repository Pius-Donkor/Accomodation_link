import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile as updateUserProfileApi } from "../../Services/apiUser";
import toast from "react-hot-toast";

export default function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const {
    mutate: updateUserProfile,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: (data) => updateUserProfileApi(data),
    mutationKey: ["user"],
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("profile image uploaded successfully");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(
        "sorry , could not upload your profile , check your internet connection or try later ",
      );
    },
  });
  return { updateUserProfile, isUpdating, updateError };
}
