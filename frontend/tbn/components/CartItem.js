import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

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
`;

const CartListItem = props => {
  console.log(props);
  return (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id: props.id }}>
      {({ data, err, loading }) => {
        if (loading) return '...loading..';
        return (
          <CartItem>
            <p>{data.cartItem.title}</p>
            <p>{data.cartItem.price}</p>
          </CartItem>
        );
      }}
    </Query>
  );
};

export default CartListItem;
