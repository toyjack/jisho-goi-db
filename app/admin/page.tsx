import { authOptions } from "@/lib/nextauth-options"
import { getServerSession } from "next-auth"

async function page() {
  const session = await getServerSession(authOptions)
  return (
    <div>
      <h1>Admin Home</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </div>

  )
}

export default page