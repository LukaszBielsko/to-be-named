import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import gql from 'graphql-tag';
import User from './User';

class TakeMyMoney extends Component {
  render() {
    return <User>{data => <p>hello</p>}</User>;
  }
}

export default TakeMyMoney;
