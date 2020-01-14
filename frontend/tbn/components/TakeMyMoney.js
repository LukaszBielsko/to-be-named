import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import gql from 'graphql-tag';
import User from './User';
import { calculateTotalPrice } from '../lib/utils';

class TakeMyMoney extends Component {
  render() {
    const { children } = this.props;
    return (
      <User>
        {user => {
          /* TODO again, this is so wrong */
          let me;
          if (user.data) {
            me = user.data.me;
          }
          if (!me) return null;
          return (
            <StripeCheckout amount={calculateTotalPrice(me.cart)}>
              {children}
            </StripeCheckout>
          );
        }}
      </User>
    );
  }
}

export default TakeMyMoney;
