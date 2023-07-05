"use client";
import {signOut} from 'next-auth/react'

function LogoutButton() {
  const logoutHandler = () => {
    signOut(
      {
        callbackUrl: `${window.location.origin}/`
      }
    )
  }

  return (
    <button className="btn btn-error" onClick={logoutHandler}>ログアウト</button>
  )
}

export default LogoutButton