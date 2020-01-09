import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Product from './Product';

const StyledShop = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    products {
      title
      price
      description
      _id
    }
  }
`;

class Shop extends Component {
  render() {
    return (
      <StyledShop>
        <Query query={ALL_PRODUCTS_QUERY}>
          {({ data, error, loading }) => {
            if (loading) return <p>...loading...</p>;
            return data.products.map(product => (
              <Product key={product._id} {...product} />
            ));
          }}
        </Query>
      </StyledShop>
    );
  }
}

export default Shop;
