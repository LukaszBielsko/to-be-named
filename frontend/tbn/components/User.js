import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    me {
      _id
      name
    } 
  }
`

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {/* {payload => {
      console.log(payload)
      return props.children(payload)
    }} */}
    {({ loading, error, data }) => {
      console.log(data)
      let me;
      if (data) me = data
      if (me) return props.children(me)
      else return null
    }}
  </Query>
)

export default User;

/* TODO
  how does render props exactly work?
  how does props.children(someData)?
  how sameData can be accessed in rendered component?
*/