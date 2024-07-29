// src/pages/Analytics.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", users: 400, listings: 240 },
  { name: "Feb", users: 300, listings: 139 },
  { name: "Mar", users: 200, listings: 980 },
  { name: "Apr", users: 278, listings: 390 },
  { name: "May", users: 189, listings: 480 },
  { name: "Jun", users: 239, listings: 380 },
  { name: "Jul", users: 349, listings: 430 },
];

const Analytics = () => {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Analytics</h1>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#8884d8" />
          <Line type="monotone" dataKey="listings" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Analytics;
