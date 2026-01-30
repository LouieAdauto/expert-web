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
      price_rate
      skill {
        id
        name
        description
      }
      countries {
        name
      }
      reviewsUsingReviews_reviewer_id_fkey {
      id
    }
    }
  }
`;

export const QUERY_FULL_USER = gql`
  query QueryUser($id: ID!) {
    profile(id: $id) {
      id
      name
      image
      backimage
      position
      about
      rating

      experience {
        id
        companyname
        companyimage
        title
      }

      post {
        id
        content
        image
        created_at
      }

      reviewsUsingReviews_reviewee_id_fkey {
        id
        rating
        comments
        review_date
        profileUsingReviews_reviewer_id_fkey {
          id
          image
          name
        }
      }
    }
  }
`;
