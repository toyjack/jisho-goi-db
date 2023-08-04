import { userDeleteById, userFindOne } from '@/db/users'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react'

async function UserItemPage({params}:{params: {userId: string}}) {
  const userId = params.userId
  const user = await userFindOne(userId)

  async function handleSubmit(data: FormData){
    "use server";
    const userId = data.get('userId') as string
    const deletedUser = userDeleteById(userId)
    console.log("deletedUser", deletedUser)
    revalidatePath("/admin/users")
    redirect("/admin/users")
  }

  return (
    <div>
      <h1>このユーザーを削除しますか</h1>
      <div>
        <table className='table'>
          <tbody>
            <tr>
              <th>ID</th>
              <td>{user?.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{user?.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user?.email}</td>
            </tr>
            <tr>
              <th>Role</th>
              <td>{user?.role}</td>
            </tr>
            <tr>
              <th>Created At</th>
              <td>{String(user?.createdAt)}</td>
            </tr>
            
          </tbody>
        </table>
      </div>
      <div>
        <form action={handleSubmit}>
          <input type="hidden" name="userId" value={user?.id} id="userId" />
          <input type="submit" value="はい、削除します！" className='btn btn-error' />
        </form>
      </div>
    </div>
  )
}

export default UserItemPage