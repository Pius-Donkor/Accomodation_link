import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPropertyOwner } from "../../Services/apiUser";

export default function useGetOwner(id) {
  const {
    data: propertyOwner = {},
    isLoadingOwner,
    errorOwner,
  } = useQuery({
    queryFn: () => getPropertyOwner(id),
    queryKey: ["user", id],
  });

  // console.log(authUserId);
  // console.log(userData, isLoadingOwner);
  return { propertyOwner, isLoadingOwner, errorOwner };
}
