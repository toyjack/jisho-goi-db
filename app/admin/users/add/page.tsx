import { userCreate } from '@/db/users';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import React from 'react'

async function UserAddPage() {
  async function handleSubmit(data: FormData){
    "use server";
    const name = data.get('name') as string
    const email = data.get('email')  as string
    const password = data.get('password')  as string
    const newUser = await userCreate({name, email, password})
    console.log(newUser)
    revalidatePath("/admin/users")
    redirect("/admin/users")
  }
  return (
    <div>
      <h1>ユーザーの追加</h1>
      <div>
        <form action={handleSubmit} className='flex flex-col gap-2'>
          <input type="text" name="name" id="name" placeholder='name' />
          <input type="email" name="email" id="email" placeholder='email' />
          <input type="password" name="password" id="password" placeholder='password' />
          <input type="submit" value="submit" />
        </form>
      </div>
    </div>
  )
}

export default UserAddPage