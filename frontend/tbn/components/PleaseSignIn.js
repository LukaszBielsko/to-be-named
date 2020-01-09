import { Query } from 'react-apollo';

import SignIn from './SignIn';
import { CURRENT_USER_QUERY } from './User';

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, error, loading }) => {
      if (loading) return <p>loading</p>;
      if (data.me) {
        return props.children;
      }

      let message;
      if (props.message) message = props.message;
      else message = 'Please sign in.';

      return (
        <div>
          <p>{message}</p>
          <SignIn />
        </div>
      );
    }}
  </Query>
);

export default PleaseSignIn;
