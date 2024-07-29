// src/pages/Users.js
import React, { useState } from "react";

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
      <table className="min-w-full rounded-lg bg-white shadow-sm">
        <thead>
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Add dynamic user data here */}
          <tr>
            <td className="p-4">John Doe</td>
            <td className="p-4">john@example.com</td>
            <td className="p-4">Tenant</td>
            <td className="p-4">
              <button className="rounded-lg bg-red-500 px-3 py-1 text-white">
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
