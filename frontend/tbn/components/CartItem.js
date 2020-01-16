import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import RemoveFromCart from './RemoveFromCart';
import { formatMoney } from '../lib/utils';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: String!) {
    cartItem(id: $id) {
      _id
      title
      price
    }
  }
`;

const CartItem = styled.div`
  border-bottom: 1px double black;
  display: flex;
  p {
    margin: 2px 10px;
  }
  button {
    margin: 5px 20px 4px auto;
    border-radius: 40px;
    background-color: rgb(295, 00, 00);
  }
`;

const CartListItem = ({ id }) => (
  <Query query={SINGLE_ITEM_QUERY} variables={{ id }}>
    {({ data, err, loading }) => {
      if (loading) return '...loading..';
      const { title, price } = data.cartItem;
      return (
        <CartItem>
          <p>{title}</p>
          <p>{formatMoney(price)}</p>
          <RemoveFromCart id={id} />
        </CartItem>
      );
    }}
  </Query>
);

export default CartListItem;
