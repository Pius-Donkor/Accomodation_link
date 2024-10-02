import { getUsersProperties } from "../../Services/apiProperties";
import { useQuery } from "@tanstack/react-query";

export default function useGetUsersProperties(userId) {
  const {
    data: usersProperties = [],
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getUsersProperties(userId),
    queryKey: ["properties", userId],
    enabled: userId !== "loading" && userId !== null,
  });

  // console.log(authUserId);
  // console.log(userData, isLoading);
  return { usersProperties, isLoading, error };
}
