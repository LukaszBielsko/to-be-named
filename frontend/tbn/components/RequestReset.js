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
    message: '',
  };

  onChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, message } = this.state;
    return (
      <Mutation mutation={REQUEST_RESET_MUTATION} variables={this.state}>
        {(requestReset, { loading, called }) => (
          <Form
            method="post"
            onSubmit={async event => {
              event.preventDefault();
              await requestReset()
                .then(payload => {
                  this.setState({
                    message: payload.data.requestPasswordReset.message,
                  });
                })
                .catch(err => {
                  if (err) this.setState({ message: err.message });
                });
            }}
          >
            <h3>Password reset</h3>
            <p>{message}</p>
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
