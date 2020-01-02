import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      _id
      email
      name
    }
  }
`;

const User = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {payload => props.children(payload)}
  </Query>
);

User.propTypes = {
  children: PropTypes.func.isRequired,
};

export default User;
export { CURRENT_USER_QUERY };

// import { Query } from 'react-apollo';
// import gql from 'graphql-tag';
// import PropTypes from 'prop-types';

// const CURRENT_USER_QUERY = gql`
//   query CURRENT_USER_QUERY {
//     me {
//       _id
//       name
//       email
//     }
//   }
// `;

// const User = props => (
//   <Query {...props} query={CURRENT_USER_QUERY}>
//     {payload => props.children(payload)}
//   </Query>
// );

// User.propTypes = {
//   children: PropTypes.func.isRequired,
// };

// export default User;

// /* TODO
//   how does render props exactly work?
//   how does props.children(someData)?
//   how sameData can be accessed in rendered component?
// */
