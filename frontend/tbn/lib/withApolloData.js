import ApolloClient from 'apollo-boost';
import withApollo from 'next-with-apollo';

const endpoint = `http://localhost:4000`

function createClient({headers}) { //headers for authentication 
    return new ApolloClient({
        uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
        request: operation => { // sort of express middleware
            operation.setContext({
                fetchOptions: {     
                    credentials: 'include', // has to do with cookies and user being logged in or not 
                },
                headers,
            });
        },
    })
}

export default withApollo(createClient) ; //withApollo is a HOC that will expose some props 



// gql function for parsing your query string into a query document.