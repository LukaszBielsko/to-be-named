import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Link from 'next/link';

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY {
    allOrders {
      _id
      total
    }
  }
`;

const StyledOrderItem = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: white;
  padding: 10px 60px;
  width: 60%;
  margin: 20px auto;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    transform: scale(1.01);
  }
  span {
    font-weight: bold;
  }
`;

const Orders = () => {
  console.log('aha');
  return (
    <Query query={ALL_ORDERS_QUERY}>
      {({ data, loading }) => {
        if (loading) return <p>...loading orders...</p>;
        console.log({ data });
        return data.allOrders.map(order => (
          <Link
            href={{
              pathname: 'order',
              query: { id: order._id },
            }}
          >
            <StyledOrderItem>
              <p>
                <span>Order No:</span> {order._id}
              </p>
              <p>
                <span>Order total:</span>
                {order.total}
              </p>
            </StyledOrderItem>
          </Link>
        ));
      }}
    </Query>
  );
};

export default Orders;
