import React from 'react'

async function JiruishoChushakuResultsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string };
}) {
  return (
    <div>
      <pre>
        {JSON.stringify(searchParams, null, 2)}
      </pre>
    </div>
  )
}

export default JiruishoChushakuResultsPage