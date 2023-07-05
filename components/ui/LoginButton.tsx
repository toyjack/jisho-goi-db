'use client';

import {signIn} from 'next-auth/react'

function LoginButton() {
  const loginHandler = () => {
    signIn()
  }

  return (
    <button className='btn btn-primary' onClick={loginHandler}>ログイン</button>
  )
}

export default LoginButton