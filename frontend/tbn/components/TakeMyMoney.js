import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import gql from 'graphql-tag';

import User, { CURRENT_USER_QUERY } from './User';
import { calculateTotalPrice } from '../lib/utils';

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      total
      _id
    }
  }
`;

class TakeMyMoney extends Component {
  onToken = async (res, createOrder) => {
    NProgress.start();
    const order = await createOrder({
      variables: { token: res.id },
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }).catch(err => alert(err.message));
    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder._id },
    });
    NProgress.done();
  };

  render() {
    const { children } = this.props;
    return (
      <User>
        {user => {
          /* TODO again, this is so wrong, I think  */
          let me;
          if (user.data) {
            me = user.data.me;
          }
          if (!me) return null;
          return (
            <Mutation
              mutation={CREATE_ORDER_MUTATION}
              refetchQueries={[{ query: CURRENT_USER_QUERY }]}
            >
              {createOrder => (
                <StripeCheckout
                  amount={calculateTotalPrice(me.cart)}
                  name="Brushed Away"
                  stripeKey="pk_test_ih9kQkILxpb62yr0Ko5WBiMQ00BTOH4S4w"
                  currency="USD"
                  email={me.email}
                  token={res => this.onToken(res, createOrder)}
                >
                  {children}
                </StripeCheckout>
              )}
            </Mutation>
          );
        }}
      </User>
    );
  }
}

export default TakeMyMoney;
