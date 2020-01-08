import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/form';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestPasswordReset(email: $email) {
      message
    }
  }
`;

class RequestReset extends Component {
  state = {
    email: '',
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email } = this.state;
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(reset, { called, loading }) => (
          <Form
            method="post"
            onSubmit={event => {
              event.preventDefault();
              reset();
              this.setState({ email: '' });
            }}
          >
            <h3>Password reset</h3>
            {!loading && called && <p>Request succesfull</p>}
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
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}

export default RequestReset;
