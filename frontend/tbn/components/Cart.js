import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import styled from 'styled-components';

import CartStyles from './styles/cartStyles';
import User from './User';
import CartItem from './CartItem';

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

const Cart = props => (
  <User>
    {user => {
      let me;
      if (user.data) {
        me = user.data.me;
      }
      if (!me) return null;
      return (
        <Mutation mutation={TOGGLE_CART_MUTATION}>
          {toggleCart => (
            <Query query={LOCAL_STATE_QUERY}>
              {({ data, error, loading }) => (
                <CartStyles open={data.cartOpen}>
                  <button
                    className="close-btn"
                    type="button"
                    onClick={toggleCart}
                  >
                    &times;
                  </button>
                  <p>
                    You have {me.cart.length} item
                    {me.cart.length > 1 ? 's' : null} in you cart.
                  </p>
                  {me.cart.map(product => (
                    <CartItem id={product._id} />
                  ))}
                  <p>
                    Total price:
                    {me.cart.reduce((prev, cur) => prev + cur.price, 0)}
                  </p>
                </CartStyles>
              )}
            </Query>
          )}
        </Mutation>
      );
    }}
  </User>
);

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
