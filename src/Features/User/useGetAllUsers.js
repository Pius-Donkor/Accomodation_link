import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../Services/apiUser";

export default function useGetAllUsers() {
  const {
    data: allUsers = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  return { allUsers, error, isLoading };
}
