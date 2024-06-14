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
      toast.success("you have been signed in successfully");
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { signUp, isSigning, error };
}
