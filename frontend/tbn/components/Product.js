import styled from 'styled-components';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import { CURRENT_USER_QUERY } from './User';
import { formatMoney } from '../lib/utils';

const ProductCard = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  /* height: 00px; */
  margin: 1rem;
  position: relative;
  width: 650px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    transform: scale(1.01);
  }
  .product-header {
    display: flex;
    justify-content: space-evenly;
  }
  .product-title {
    font-size: 4rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .product-price {
    margin-left: 20px;
    color: red;
    font-size: 3.6rem;
    position: relative;
    bottom: 40px;
  }
  .product-bottom {
    display: flex;
    justify-content: space-evenly;
    .product-description {
      font-style: italic;
    }
    button {
      color: yellow;
      text-transform: uppercase;
      text-decoration: none;
      background: red;
      padding: 10px;
      border-radius: 5px;
      display: inline-block;
      border: none;
      transition: all 0.4s ease 0s;
      align-self: center;
      font-size: 30px;
      font-family: 'Inconsolata', monospace;
      &:hover {
        color: red;
        font-size: 2.6rem;
        background-color: yellow;
        letter-spacing: 5px;
        transition: all 0.4s ease 0s;
        height: 70px;
      }
    }
  }
`;

const ADD_TO_CART = gql`
  mutation ADD_TO_CART($productId: String!) {
    addProductToCart(productId: $productId) {
      title
    }
  }
`;

const Product = ({ title, price, description, _id }) => (
  <ProductCard>
    <div className="product-header">
      <p className="product-title">{title}</p>
      <p className="product-price">$ {formatMoney(price)}</p>
    </div>
    <div className="product-bottom">
      <p className="product-description">{description}</p>
      <Mutation
        mutation={ADD_TO_CART}
        variables={{ productId: _id, title, price, description }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {addToCart => <button onClick={addToCart}>buy me</button>}
      </Mutation>
    </div>
  </ProductCard>
);

export default Product;
