// src/pages/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Dashboard Overview</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium">Total Users</h2>
          <p className="text-3xl">1,234</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium">Active Listings</h2>
          <p className="text-3xl">567</p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="text-lg font-medium">Recent Activities</h2>
          <ul>
            <li>User John added a new property.</li>
            <li>Mary updated her property listing.</li>
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="mb-2 text-lg font-medium">Quick Links</h2>
        <div className="flex space-x-4">
          <Link
            to="/users"
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            Manage Users
          </Link>
          <Link
            to="/properties"
            className="rounded-lg bg-green-500 px-4 py-2 text-white"
          >
            Manage Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
