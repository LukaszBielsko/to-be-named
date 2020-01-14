import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import styled from 'styled-components';
import { adopt } from 'react-adopt';

import CartStyles from './styles/cartStyles';
import User from './User';
import CartItem from './CartItem';
import TakeMyMoney from './TakeMyMoney';
import { calculateTotalPrice, formatMoney } from '../lib/utils';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

const Composed = adopt({
  user: <User />,
  toggleCart: <Mutation mutation={TOGGLE_CART_MUTATION} />,
  localState: <Query query={LOCAL_STATE_QUERY}></Query>,
});

const Cart = props => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      /* TODO this is so wrong, fix */
      let me;
      if (user.data) {
        me = user.data.me;
      }
      if (!me) return null;
      return (
        <CartStyles open={localState.data.cartOpen}>
          <button className="close-btn" type="button" onClick={toggleCart}>
            &times;
          </button>
          <p>
            You have {me.cart.length} item
            {me.cart.length > 1 ? 's' : null} in you cart.
          </p>
          {me.cart.map(product => (
            <CartItem id={product._id} />
          ))}
          <p className="total-price">
            Total price: {formatMoney(calculateTotalPrice(me.cart))}
          </p>
          <TakeMyMoney>
            <button className="checkoutButton" type="button">
              Checkout!
            </button>
          </TakeMyMoney>
        </CartStyles>
      );
    }}
  </Composed>
);

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
