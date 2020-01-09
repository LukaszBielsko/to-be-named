import { Query } from 'react-apollo';

import SignIn from './SignIn';
import { CURRENT_USER_QUERY } from './User';

const PleaseSignIn = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, error, loading }) => {
      console.log(data);
      if (loading) return <p>loading</p>;
      if (data.me) {
        return props.children;
      }
      return (
        <div>
          <p>Pls sign in :)</p>
          <SignIn />
        </div>
      );
    }}
  </Query>
);

export default PleaseSignIn;
