import React from 'react'

function Results({
  searchParams,
}: {
  searchParams: { query?: string }
}) {
  return (
    <div>Results for {searchParams.query}
    
    </div>
  )
}

export default Results