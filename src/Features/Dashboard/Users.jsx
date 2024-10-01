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
import Modal from "../../UI/Modal";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { allUsers, error, isLoading } = useGetAllUsers();
  const [modalOpenName, setModalOpenName] = useState(null);
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
      <Modal>
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
                <>
                  <Modal.Open
                    key={user.userId}
                    openName={`user${user.userId}`}
                    onExternalAction={() =>
                      setModalOpenName(`user${user.userId}`)
                    }
                  >
                    <UserTableCard user={user} />
                  </Modal.Open>
                </>
              ))
            ) : (
              <p>there are no users found</p>
            )}
          </TableBody>
        </Table>
        <Modal.Window openName={modalOpenName}>
          <p>hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</p>
        </Modal.Window>
      </Modal>
    </div>
  );
};

export default Users;
