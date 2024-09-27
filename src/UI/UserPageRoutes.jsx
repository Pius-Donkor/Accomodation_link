import React from "react";
import useGetUser from "../Features/User/useGetUser";
import { Route, Routes } from "react-router-dom";
import MyListings from "../Pages/MyListings";
import EditUser from "../Pages/EditUser";

export default function UserPageRoutes() {
  const { userData } = useGetUser();
  return (
    <Routes>
      {userData?.role.includes("property_owner") ? (
        <>
          <Route path="mylistings" index element={<MyListings />} />
          <Route path="edituser" element={<EditUser />} />
        </>
      ) : (
        <Route path="edituser" index element={<EditUser />} />
      )}
    </Routes>
  );
}
