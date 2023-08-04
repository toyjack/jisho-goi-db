import { authOptions } from "@/lib/nextauth-options"
import { getServerSession } from "next-auth"

async function page() {
  const session = await getServerSession(authOptions)
  
  return (
    <div>
      <h1>管理システム</h1>
      <div>

      </div>
    </div>
  )
}

export default page