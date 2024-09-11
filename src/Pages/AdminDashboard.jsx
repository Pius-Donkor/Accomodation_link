import React, { useEffect } from "react";
import Layout from "../Features/Dashboard/lLayout";
import { Outlet, useNavigate } from "react-router-dom";
import useGetUser from "../Features/User/useGetUser";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { userData, error, isLoading } = useGetUser();
  console.log(userData);
  useEffect(() => {
    if (!userData?.role) return;
    if (userData.role !== "admin") {
      console.log(userData.role, userData.userName);
      toast.error("Only an Administrator can have access to this page ");
      navigate("/");
    }
  }, []);

  if (isLoading) return <p>loading...</p>;

  if (!isLoading && userData?.role === "admin")
    return (
      <Layout userData={userData}>
        <Outlet />
      </Layout>
    );

  return <div>hellooooo</div>;
}
