import { userFindMany } from "@/db/users";
import Link from "next/link";
import React from "react";

async function AdminUsersPage() {
  const allUsers = await userFindMany();

  return (
    <div>
      <h1>ユーザーの管理</h1>
      <div>
        <Link href={`/admin/users/add`} className="btn btn-primary">
          ADD
        </Link>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{String(user.createdAt)}</td>
                <td className="flex gap-1">
                  <Link
                    href={`/admin/users/edit/${user.id}`}
                    className="btn btn-info"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/admin/users/delete/${user.id}`}
                    className="btn btn-error"
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsersPage;
