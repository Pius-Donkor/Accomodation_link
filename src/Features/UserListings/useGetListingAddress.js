import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAddress } from "../../Services/apiGeocoding";

export default function useGetListingAddress(position) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["address"],
    queryFn: () => getAddress(position),
  });

  return { data, isLoading, error };
}
