import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userSignUp } from "../../Services/apiUser";
import toast from "react-hot-toast";

export default function useSignUp() {
  const queryClient = useQueryClient();
  const {
    mutate: signUp,
    isPending: isSigning,
    error,
  } = useMutation({
    mutationFn: (signUpData) => userSignUp(signUpData),
    mutationKey: ["user"],
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  return { signUp, isSigning, error };
}
