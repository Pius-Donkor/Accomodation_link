import { useQuery } from "@tanstack/react-query";
import { getPropertyOwner } from "../../Services/apiUser";

export default function useGetOwner(id) {
  console.log(id);
  const {
    data: propertyOwner = {},
    isLoadingOwner,
    errorOwner,
  } = useQuery({
    queryFn: () => getPropertyOwner(id),
    queryKey: ["user", id],
    enabled: Boolean(id),
  });
  // console.log(propertyOwner);
  // console.log(authUserId);
  // console.log(userData, isLoadingOwner);
  return { propertyOwner, isLoadingOwner, errorOwner };
}
