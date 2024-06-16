import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resetForgottenPassword } from "../../Services/apiUser";

export default function useForgotPassword() {
  const queryClient = useQueryClient();
  const {
    mutate: resetPassword,
    isPending: isResetting,
    error: resettingError,
  } = useMutation({
    mutationFn: resetForgottenPassword,
    mutationKey: ["users"],
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return { resetPassword, isResetting, resettingError };
}
