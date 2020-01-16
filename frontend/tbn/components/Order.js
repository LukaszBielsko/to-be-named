import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ORDER_QUERY = gql`
  query ORDER_QUERY($id: String!) {
    order(id: $id) {
      total
      products {
        title
        price
      }
    }
  }
`;

const Order = ({ orderId }) => (
  <Query query={ORDER_QUERY} variables={{ id: orderId }}>
    {({ data, loading }) => {
      if (loading) return <p>...loading order...</p>;
      const { total, products } = data.order;
      console.log(total);
      return (
        <>
          <p>order total: {total}</p>
          {products.map(product => (
            <p>
              product name: {product.title} product price: {product.price}
            </p>
          ))}
        </>
      );
    }}
  </Query>
);

export default Order;
