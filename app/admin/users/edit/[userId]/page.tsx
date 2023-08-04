import { userFindOne } from '@/db/users'
import React from 'react'

async function UserItemPage({params}:{params: {userId: string}}) {
  const userId = params.userId
  const user = await userFindOne(userId)
  return (
    <div>
      <h1>ユーザーの管理</h1>
      <div>
        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default UserItemPage