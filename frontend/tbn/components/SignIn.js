import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/form';

const SIGN_IN_QUERY = gql`
  query SIGN_IN_QUERY($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      _id
      email
      password
    }
  }
`;

class SignUp extends Component {
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
      <Query query={SIGN_IN_QUERY} variables={this.state}>
        {signIn => (
          <Form
            method="post"
            onSubmit={event => {
              event.preventDefault();
              signIn();
              this.setState({ email: '', password: '' });
            }}
          >
            <h3>Please enter your details</h3>
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
      </Query>
    );
  }
}

export default SignUp;
