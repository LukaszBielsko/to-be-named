import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Mutation } from 'react-apollo';

import User from './User';
import SingOut from './SignOut';
import { TOGGLE_CART_MUTATION } from './Cart';

const UserBar = styled.div`
  color: #000;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  text-transform: none;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 20px;
  display: block;
  text-align: right;
  background: linear-gradient(90deg, #000 30%, transparent 50%),
    linear-gradient(180deg, #000 0, #363738);
  // check this out
  //linear-gradient(1deg,#000 40%,transparent 50%),linear-gradient(180deg,#000 0,#363738)
  p {
    margin: 0;
    padding-right: 10px;
    color: white;
    display: inline;
  }
  button,
  a {
    background-color: rgba(0, 0, 0, 0.3);
    text-decoration: none;
    color: white;
    padding: 8px;
    border: none;
    font-size: 20px;
    font-family: inherit;
    cursor: pointer;
  }
`;

const AboveHeader = props => (
  <UserBar>
    <User>
      {({ data }) => {
        if (data) {
          if (data.me) {
            /* TODO this will redirect to user panel */
            return (
              <>
                <p>Hello, {data.me.name}!</p>
                <Mutation mutation={TOGGLE_CART_MUTATION}>
                  {toggleCart => (
                    <>
                      <button type="button" onClick={toggleCart}>
                        Cart: {data.me.cart.length} Item
                        {data.me.cart.length > 1 ? 's' : ''}
                      </button>
                      <Link href="/orders">
                        <a>Orders</a>
                      </Link>
                    </>
                  )}
                </Mutation>
                <SingOut />
              </>
            );
          }
        }
        return (
          <Link href="/signup">
            <div className="sign-up">
              <p>sign up / sign in</p>
            </div>
          </Link>
        );
      }}
    </User>
  </UserBar>
);

export default AboveHeader;
