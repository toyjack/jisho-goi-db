import { userCreate } from "@/db/users";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import React from "react";

async function UserAddPage() {
  const roleList = Role;
  async function handleSubmit(data: FormData) {
    "use server";
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const newUser = await userCreate({ name, email, password });
    console.log(newUser);
    revalidatePath("/admin/users");
    redirect("/admin/users");
  }
  return (
    <div className="p-4 m-4">
      <h1 className="text-3xl font-bold">ユーザーの追加</h1>
      <div>
        <form action={handleSubmit} className="flex flex-col gap-2">
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              name="name"
              type="text"
              className="input input-bordered bg-base-300 text-base-content w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="text"
              className="input input-bordered bg-base-300 text-base-content w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Role</span>
            </label>
            <select
              name="role"
              className="select select-bordered w-full max-w-xs bg-base-300 text-base-content"
            >
              <option disabled selected>
                選択してください
              </option>
              {Object.keys(roleList).map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              type="password"
              className="input input-bordered bg-base-300 text-base-content w-full max-w-xs"
            />
          </div>

          <input type="submit" value="submit" className="btn btn-primary max-w-xs" />
        </form>
      </div>
    </div>
  );
}

export default UserAddPage;