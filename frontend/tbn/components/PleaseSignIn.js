import { Query } from 'react-apollo';

import SignIn from './SignIn';
import { CURRENT_USER_QUERY } from './User';

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, error }) => {
      console.log(data);
      return <p>Pls sign in :)</p>;
    }}
  </Query>
);

export default PleaseSignIn;
