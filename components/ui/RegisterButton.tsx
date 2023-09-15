import Link from "next/link"


function RegisterButton() {

  return (
    <Link href={`/auth/register`} className='btn btn-secondary' >登録</Link>
  )
}

export default RegisterButton