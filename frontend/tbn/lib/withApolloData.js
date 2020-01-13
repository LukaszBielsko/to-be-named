import ApolloClient from 'apollo-boost';
import withApollo from 'next-with-apollo';

import { LOCAL_STATE_QUERY } from '../components/Cart';

const endpoint = `http://localhost:4000`;

function createClient({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
        },
        headers,
      });
    },
    // local data
    clientState: {
      resolvers: {
        Mutation: {
          toggleCart(_, variables, { cache }) {
            // read the cartOpen value from the cache
            const { cartOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            // Write the cart State to the opposite
            const data = {
              data: { cartOpen: !cartOpen },
            };
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        cartOpen: false,
      },
    },
  });
}

export default withApollo(createClient); // withApollo is a HOC that will expose some props

// MY VERSION
// could not bother with apollo docs as it is horrible

// function createClient({ headers }) {
//   // headers for authentication
//   return new ApolloClient({
//     uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
//     request: operation => {
//       // sort of express middleware
//       operation.setContext({
//         fetchOptions: {
//           credentials: 'include', // has to do with cookies and user being logged in or not
//         },
//         headers,
//       });
//     },
//     clientState: {
//       resolvers: {},
//       defaults: {
//         cartOpen: false,
//       },
//     },
//   });
// }
