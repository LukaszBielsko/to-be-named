import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';

import { CURRENT_USER_QUERY } from './User';
import Form from './styles/form';

const RESET_PASSWORD_MUTATION = gql`
  mutation RESET_PASSWORD_MUTATION(
    $email: String!
    $password: String!
    $confirmPassword: String!
    $resetToken: String!
  ) {
    resetPassword(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
      resetToken: $resetToken
    ) {
      message
    }
  }
`;

class ResetPassword extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    message: '',
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, confirmPassword, message } = this.state;
    const { resetToken } = this.props;
    return (
      <Mutation
        mutation={RESET_PASSWORD_MUTATION}
        variables={{ email, password, confirmPassword, resetToken }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {reset => (
          <Form
            method="post"
            onSubmit={async event => {
              event.preventDefault();
              await reset()
                .then(() => {
                  this.setState({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    message: 'Password reset successfull',
                  });
                  setTimeout(() => {
                    Router.push({
                      pathname: '/arts',
                    });
                  }, 1000);
                })
                .catch(err => {
                  this.setState({ message: err.message });
                });
            }}
          >
            <h3>Please enter your details</h3>
            <h5>{message}</h5>
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
              <label htmlFor="confirmPassword">
                <input
                  onChange={this.onChangeHandler}
                  name="confirmPassword"
                  value={confirmPassword}
                  type="password"
                  required
                  placeholder="Confirm your password"
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

export default ResetPassword;
