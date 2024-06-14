import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { userLogin } from "../../Services/apiUser";
import toast from "react-hot-toast";

export default function useLogin() {
  const queryClient = useQueryClient();
  const {
    mutate: login,
    isPending: isLoggingIn,
    error: loginError,
  } = useMutation({
    mutationFn: (loginData) => userLogin(loginData),
    mutationKey: ["user"],
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast.success("login successfully done");
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });
  return { login, isLoggingIn, loginError };
}
