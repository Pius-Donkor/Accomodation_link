// src/pages/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { FiClock } from "react-icons/fi";
import { AiFillProduct } from "react-icons/ai";

const Dashboard = () => {
  return (
    <div className="text-slate-800">
      <h1 className="mb-4 text-2xl font-semibold ">Dashboard Overview</h1>
      <div className="flex flex-wrap justify-start gap-6  ">
        {/* Number of users */}
        <div className=" flex items-center gap-8 rounded-lg bg-white px-16 py-4  shadow-sm ">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-200  ">
            <FaUsers className="text-3xl text-red-800 " />
          </span>
          <div>
            <h2 className="text-lg font-medium  ">Total Users</h2>
            <p className="text-3xl">1,234</p>
          </div>
        </div>
        <div className=" flex items-center gap-8 rounded-lg bg-white px-16 py-4  shadow-sm ">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-200  ">
            <FiClock className="text-3xl text-green-800 " />
          </span>
          <div>
            <h2 className="text-lg font-medium  ">Active Listings</h2>
            <p className="text-3xl">576</p>
          </div>
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
            to="/admindashboard/users"
            className="rounded-lg bg-blue-500 px-4 py-2 text-white"
          >
            Manage Users
          </Link>
          <Link
            replace={true}
            to="/admindashboard/allproperties"
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
