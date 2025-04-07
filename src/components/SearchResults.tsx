"use client"
import React from 'react'
import { gql, useQuery } from '@apollo/client'

const searchQuery = gql`
  query searchResults($searchTerm: String!) {
    searchProfiles(searchTerm: $searchTerm) {
      alias
      image
      name
      position
      skills {
        name
        id
      }
      yoe
    }
  }
`

function Results({ query }: { query?: string }) {
  const searchTerm = query || ''
  
  const { data, loading, error } = useQuery(searchQuery, {
    variables: { searchTerm },
    skip: !searchTerm
  })

  return (
    <div>
      <h1>Results for {searchTerm}</h1>
      {error && <p>Error: {error.message}</p>}
      {loading && <p>Loading...</p>}
      
      {/* {data?.searchProfiles?.map(profile => (
        <div key={profile.alias}>
          <h2>{profile.name}</h2>
          <p>{profile.position}</p>
        </div>
      ))} */}
    </div>
  )
}

export default Results
