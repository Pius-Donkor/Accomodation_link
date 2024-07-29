// src/pages/Properties.js
import React from "react";

const Properties = () => {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Properties</h1>
      <table className="min-w-full rounded-lg bg-white shadow-sm">
        <thead>
          <tr>
            <th className="p-4">Property</th>
            <th className="p-4">Location</th>
            <th className="p-4">Price</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Add dynamic property data here */}
          <tr>
            <td className="p-4">Beautiful Apartment</td>
            <td className="p-4">Accra</td>
            <td className="p-4">$1200</td>
            <td className="p-4">Pending</td>
            <td className="p-4">
              <button className="rounded-lg bg-blue-500 px-3 py-1 text-white">
                Approve
              </button>
              <button className="rounded-lg bg-red-500 px-3 py-1 text-white">
                Reject
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Properties;
