import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from './User';
import Form from './styles/form';

const SIGN_UP_MUTATION = gql`
  mutation SIGN_UP_MUTATION(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signUp(name: $name, email: $email, password: $password) {
      _id
      name
      email
      password
    }
  }
`;

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { name, email, password } = this.state;
    return (
      <Mutation
        mutation={SIGN_UP_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {signUp => (
          <Form
            method="post"
            onSubmit={event => {
              event.preventDefault();
              signUp();
              this.setState({ name: '', email: '', password: '' });
            }}
          >
            <h3>Please enter your details</h3>
            <fieldset>
              <label htmlFor="name">
                <input
                  onChange={this.onChangeHandler}
                  name="name"
                  value={name}
                  required
                  type="text"
                  placeholder="Your name"
                />
              </label>
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

export default SignUp;
