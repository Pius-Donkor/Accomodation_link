import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../Services/apiUser";
import useGetAuthUser from "./useGetAuthUser";

export default function useGetUser() {
  const { authUserId } = useGetAuthUser();

  const {
    data: [userData] = [],
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getUser(authUserId),
    queryKey: ["user"],
    enabled: authUserId !== "loading" && authUserId !== null,
  });

  // console.log(authUserId);
  // console.log(userData, isLoading);
  return { userData, isLoading, error };
}
