import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/form';

import { CURRENT_USER_QUERY } from './User';

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      _id
      email
      password
    }
  }
`;

class SignIn extends Component {
  state = {
    email: '',
    password: '',
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <Mutation
        mutation={SIGN_IN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {signIn => (
          <Form
            method="post"
            onSubmit={event => {
              event.preventDefault();
              signIn();
              this.setState({ email: '', password: '' });
            }}
          >
            <h3>Please sign in</h3>
            <fieldset>
              <label htmlFor="email">
                <input
                  onChange={this.onChangeHandler}
                  name="email"
                  value={email}
                  required
                  type="email"
                  placeholder="Your email"
                />
              </label>
              <label htmlFor="password">
                <input
                  onChange={this.onChangeHandler}
                  name="password"
                  value={password}
                  type="password"
                  required
                  placeholder="Your password"
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default SignIn;
