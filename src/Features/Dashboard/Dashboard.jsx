// src/pages/Dashboard.js
import React from "react";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { BsFillHouseLockFill } from "react-icons/bs";
import { BsFillHousesFill } from "react-icons/bs";
import DashboardItem from "../../UI/DashboardItem";
import RecentActivities from "./RecentActivities";
import Analytics from "./analytics";

const Dashboard = () => {
  return (
    <div className="flex flex-col  gap-4 text-slate-800 ">
      <h1 className="mb-4 text-2xl font-semibold ">Dashboard Overview</h1>
      <div className="mt-4">
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
      <div className="flex flex-wrap justify-start gap-4  ">
        {/* Number of users */}
        <DashboardItem Icon={FaUsers} heading={"Total Users"} value={"176"} />
        <DashboardItem
          Icon={BsFillHousesFill}
          heading={"Active Listings"}
          value={"56"}
          iconBackgroundColor="bg-green-200"
          iconColor="text-green-800"
        />
        <DashboardItem
          Icon={BsFillHouseLockFill}
          heading={"Rented Listings"}
          value={"26"}
          iconBackgroundColor="bg-orange-200"
          iconColor="text-orange-800"
        />
        <RecentActivities />
      </div>

      <Analytics />
    </div>
  );
};

export default Dashboard;
