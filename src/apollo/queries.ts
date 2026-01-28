import { gql } from "@apollo/client";
export const SEARCH_PROFILES = gql`
  query SearchProfiles($searchTerm: String!) {
    searchProfiles(searchTerm: $searchTerm) {
      id
      name
      image
      position
      rating
      yoe
      municipality
      alias
      skill {
        id
        name
        description
      }
      countries {
        name
      }
    }
  }
`;