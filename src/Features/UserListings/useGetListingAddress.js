import { useQuery } from "@tanstack/react-query";
import { getAddress } from "../../Services/apiGeocoding";

export default function useGetListingAddress(position) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["address"],
    queryFn: () => getAddress(position),
    enabled: position.latitude !== null && position.latitude !== null,
  });

  return { data, isLoading, error };
}
