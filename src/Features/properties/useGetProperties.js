import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProperties } from "../../Services/apiProperties";

export default function useGetProperties() {
  const {
    data: properties = [],
    error: propertiesError,
    isLoading,
  } = useQuery({
    queryFn: getAllProperties,
    queryKey: ["properties"],
  });
  return { properties, propertiesError, isLoading };
}
