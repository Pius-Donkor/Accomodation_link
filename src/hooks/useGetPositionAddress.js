import { useEffect, useState } from "react";
import useGetListingAddress from "../Features/UserListings/useGetListingAddress";

export default function useGetPositionAddress() {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  const [positionError, setPositionError] = useState(null);
  const {
    data: addressObj,
    isLoadingAddress,
    addressError,
  } = useGetListingAddress(position);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setPositionError(error.message);
        },
      );
    } else {
      setPositionError("Geolocation is not supported by this browser.");
    }
  }, []);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
  console.log(position, address);

  return { positionError, addressError, isLoadingAddress, address, position };
}
