import { authOptions } from '@/lib/nextauth-options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'

async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/api/auth/signin')

  return (
    <div>
      <h1>Profile</h1>

      <div>Email: {session.user.email}</div>
      <div>Name: {session.user.name}</div>
      <div>Role: {session.user.role}</div>
    </div>
  )
}

export default ProfilePage