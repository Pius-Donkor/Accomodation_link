// src/pages/Users.js
import React, { useState } from "react";
import Button from "../../UI/Button";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <h1 className="mb-4 text-2xl font-semibold">Users</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border p-2"
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200 rounded-lg bg-white shadow-sm">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {/* Add dynamic user data here */}
          <tr>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
              John Doe
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
              john@example.com
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
              Tenant
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
              <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Users;
