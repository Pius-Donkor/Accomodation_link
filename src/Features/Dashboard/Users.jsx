// src/pages/Users.js
import React, { useState } from "react";
import Table from "../../UI/Table";
import TableHeader from "../../UI/TableHeader";
import TableRow from "../../UI/TableRow";
import TableHeadData from "../../UI/TableHeadData";
import TableBody from "../../UI/TableBody";
import TableData from "../../UI/TableData";
import useGetAllUsers from "../User/useGetAllUsers";
import UserTableCard from "./UserTableCard";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { allUsers, error, isLoading } = useGetAllUsers();
  const filteredUsers =
    allUsers?.filter((user) =>
      user?.userName.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];
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
            <TableHeadData>Location</TableHeadData>
            <TableHeadData>Contact</TableHeadData>
            <TableHeadData>Status</TableHeadData>
            <TableHeadData>Actions</TableHeadData>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* Add dynamic user data here */}
          {isLoading && (
            <TableRow>
              <TableData hasBoldText={true}>loading...</TableData>
              <TableData>loading...</TableData>
              <TableData>loading...</TableData>
              <TableData>
                <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
                  loading...
                </button>
              </TableData>
            </TableRow>
          )}

          {!isLoading && error && <div>error</div>}
          {!isLoading && !error && allUsers.length ? (
            filteredUsers.map((user) => (
              <UserTableCard key={user.userId} user={user} />
            ))
          ) : (
            <p>there are no users found</p>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Users;
