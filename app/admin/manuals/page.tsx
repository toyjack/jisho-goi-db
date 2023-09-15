import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import React from 'react'

async function ManualsAdminHome() {
  const allManuals = await prisma.dBManual.findMany()
  return (
    <div>
      <h2>ManualsAdminHome</h2>
      <div>
      <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>DB</th>
        <th>DB名</th>
        <th>最終更新</th>
      </tr>
    </thead>
    <tbody>
      {allManuals.map((manual) => (
          <tr key={manual.id}>
            <td>
              <div>
                <Link href={`/admin/manuals/${manual.id}`} className="btn btn-sm btn-ghost">編集</Link>
              </div>
            </td>
            <td>{manual.name}</td>
            <td>{manual.full_name}</td>
            <td>{manual.updatedAt?.toLocaleDateString()+" "+manual.updatedAt?.toLocaleTimeString()}</td>
            </tr>
        ))}
    </tbody>
  </table>
</div>
        
      </div>
    </div>
  )
}

export default ManualsAdminHome