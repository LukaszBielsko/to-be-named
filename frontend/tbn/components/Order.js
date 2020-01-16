import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { formatMoney } from '../lib/utils';

const ORDER_QUERY = gql`
  query ORDER_QUERY($id: String!) {
    order(id: $id) {
      total
      _id
      products {
        title
        price
        _id
      }
    }
  }
`;

const StyledOrder = styled.div`
  margin: auto;
  width: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 30px;
  background-color: white;
  width: 50%;
  margin-top: 30px;
  table {
    thead {
      font-size: 2.7rem;
    }
    td {
      width: 200px;
    }
  }
`;

const Order = ({ orderId }) => (
  <Query query={ORDER_QUERY} variables={{ id: orderId }}>
    {({ data, loading }) => {
      if (loading) return <p>...loading order...</p>;
      const { total, products, _id } = data.order;
      return (
        <StyledOrder>
          <h2>Thank you!</h2>
          <h3>order number: {_id}</h3>
          <h3>order total: $ {formatMoney(total)}</h3>
          <table>
            <thead>
              <tr>
                <td>Product</td>
                <td>Price</td>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={`${product._id}/${index}`}>
                  <td>{product.title}</td>
                  <td>$ {formatMoney(product.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </StyledOrder>
      );
    }}
  </Query>
);

export default Order;
