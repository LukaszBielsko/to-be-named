import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY {
    allOrders {
      _id
      total
    }
  }
`;

const Orders = () => {
  console.log('aha');
  return (
    <Query query={ALL_ORDERS_QUERY}>
      {({ data, loading }) => {
        if (loading) return <p>...loading orders...</p>;
        console.log({ data });
        {
          return data.allOrders.map(order => (
            <div>
              <p>{order._id}</p>
              <p>{order.total}</p>
            </div>
          ));
        }
      }}
    </Query>
  );
};

export default Orders;
