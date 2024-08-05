// src/pages/Users.js
import React, { useState } from "react";
import Table from "../../UI/Table";
import TableHeader from "../../UI/TableHeader";
import TableRow from "../../UI/TableRow";
import TableHeadData from "../../UI/TableHeadData";
import TableBody from "../../UI/TableBody";
import TableData from "../../UI/TableData";

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
          className="w-full rounded-lg border p-2 shadow-md outline-slate-200"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadData>Name</TableHeadData>
            <TableHeadData>Email</TableHeadData>
            <TableHeadData>Role</TableHeadData>
            <TableHeadData>Actions</TableHeadData>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Add dynamic user data here */}
          <TableRow>
            <TableData hasBoldText={true}>John Doe</TableData>
            <TableData>john@example.com</TableData>
            <TableData>Tenant</TableData>
            <TableData>
              <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
                Delete
              </button>
            </TableData>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
