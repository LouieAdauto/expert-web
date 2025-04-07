"use client"
import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { useSearchParams } from 'next/navigation'

// Definir la query primero para que esté disponible en el componente
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

function Results() {
  // Quitar el await ya que searchParams es síncrono
  //const query = searchParams.query || ''
  const params = useSearchParams()
  const query = params.get('query')

  const { data, loading, error } = useQuery(searchQuery, { 
    variables: { searchTerm: query },
    skip: !query // Opcional: saltar la query si no hay término de búsqueda
  })

  return (
    <div>
      <h1>Results for {query}</h1>
      {!data?.searchProfiles.length && (
        <h1>No data</h1>
      )}
      {data?.searchProfiles?.map((element:any, index: number) => {
        return (
          <h1 key={index}>{element.alias}</h1>
        )
      })}
    </div>
  )
}



export default Results