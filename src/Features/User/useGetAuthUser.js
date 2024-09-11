import React, { useEffect, useState } from "react";
import { auth } from "../../Services/firebase";

export default function useGetAuthUser() {
  const [authUserId, setAuthUserId] = useState("loading");
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [isUser, setIsUser] = useState(null);
  const [isLoading, setIsLoading] = useState("loading");
  useEffect(() => {
    setIsLoading("loading");
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUserId(user.uid);
        console.log(user.uid);
        setIsUser(user !== null || user !== undefined);
        setIsUserVerified(user.emailVerified);
        setIsLoading("finish");
      } else {
        setIsLoading("finish");
        setAuthUserId(null);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return { authUserId, isUserVerified, isUser, isLoading };
}
