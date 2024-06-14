import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getUser } from "../../Services/apiUser";
import { auth } from "../../Services/firebase";

export default function useGetUser() {
  const [authUserId, setAuthUserId] = useState("loading");

  const {
    data: [userData] = [],
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getUser(authUserId),
    queryKey: ["users"],
    enabled: authUserId !== "loading" && authUserId !== null,
  });
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUserId(user.uid);
      } else {
        setAuthUserId(null);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, [userData]);

  console.log(authUserId);
  console.log(userData, isLoading);
  return { userData, isLoading, error };
}
