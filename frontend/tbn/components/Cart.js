import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import CartStyles from './styles/cartStyles';
import User from './User';

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
                  <p>cart, man :)</p>
                  <button type="button" onClick={toggleCart}>
                    &times;
                  </button>
                  {me.cart.map(product => (
                    <p>{product._id}</p>
                  ))}
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
