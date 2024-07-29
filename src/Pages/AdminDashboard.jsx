import React from "react";
import Dashboard from "../Features/Dashboard/Dashboard";
import Layout from "../Features/Dashboard/lLayout";
import { Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
