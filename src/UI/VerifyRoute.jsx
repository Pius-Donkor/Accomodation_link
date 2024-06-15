import React, { useEffect } from "react";
import useGetAuthUser from "../Features/User/useGetAuthUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyRoute({ children }) {
  const { isUser, isUserVerified, isLoading } = useGetAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading === "loading") return;

    if (isUser && !isUserVerified) {
      toast.error(
        "please verify your Email account by following the link sent to your email",
      );
      navigate("/");
    } else if (!isUser) {
      toast("please login /sign up to get access");
      navigate("/");
    }
  }, [isUser, isUserVerified, isLoading, navigate]);

  if (isLoading === "loading") return <p>loading...</p>;

  if (isUser && isUserVerified) {
    return <>{children}</>;
  }

  return null; // Return null to prevent rendering children before verification
}
