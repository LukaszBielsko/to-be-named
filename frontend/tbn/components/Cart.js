import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import CartStyles from './styles/cartStyles';

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
  <Mutation mutation={TOGGLE_CART_MUTATION}>
    {toggleCart => (
      <Query query={LOCAL_STATE_QUERY}>
        {({ data, error, loading }) =>
          console.log('data', data) || (
            <CartStyles open={data.cartOpen}>
              <p>cart, man :)</p>
              <button type="button" onClick={toggleCart}>
                &times;
              </button>
            </CartStyles>
          )
        }
      </Query>
    )}
  </Mutation>
);

export default Cart;
export { LOCAL_STATE_QUERY };
