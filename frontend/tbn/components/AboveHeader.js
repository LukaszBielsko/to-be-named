import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import User from './User';
import SingOut from './SignOut';

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
