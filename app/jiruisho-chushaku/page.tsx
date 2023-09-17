import { prisma } from '@/lib/prisma'
import React from 'react'
import ResultTable from './ResultTable'

async function JiruishoChushakuHome() {
  const allData = await prisma.jiruishoChushaku.findMany()
  console.log(allData)
  return (
    <div>
      <h2>JiruishoChushakuHome</h2>
      <div>
        <ResultTable data={allData} />
      </div>
    </div>
  )
}

export default JiruishoChushakuHome