// import { ApolloClient, InMemoryCache, TypePolicies, HttpLink } from '@apollo/client';

// const httpLink = new HttpLink({
//   uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER, // Replace with your GraphQL API URL
// });

// const typePolicies:TypePolicies = {
//     Query: {
//         fields: {
//             postPaginatedList: {
//                 keyArgs: false,
//                 merge(existing = [], incoming){
//                     return [...existing, ...incoming]
//                 }
//             }
//         }
//     }
// } 

// const apolloClient = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache({typePolicies}),
//   headers: {'Authorization': process.env.NEXT_PUBLIC_AUTHORIZATION_HEADER || ''},
//   // Optional: Add default options for queries
//   defaultOptions: {
//     watchQuery: {
//       fetchPolicy: 'cache-and-network',
//     },
//   },
// });
import { ApolloClient, InMemoryCache, ApolloProvider, TypePolicies } from '@apollo/client';

const typePolicies:TypePolicies = {
    Query: {
        fields: {
            postPaginatedList: {
                keyArgs: false,
                merge(existing = [], incoming){
                    return [...existing, ...incoming]
                }
            }
        }
    }
} 

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER,
  headers: {'Authorization':process.env.NEXT_PUBLIC_AUTHORIZATION_HEADER || ''},
  cache: new InMemoryCache({typePolicies}),
});

export default client;