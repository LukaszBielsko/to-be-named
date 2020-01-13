import React from 'react';
import PleaseSignIn from '../components/PleaseSignIn';
import Product from '../components/Product';
import Shop from '../components/Shop';

const test1 = props => (
  <>
    <PleaseSignIn message="This is test message :) if you are not logged in">
      <p>you are logged in, mate</p>
    </PleaseSignIn>
    <Product />
    <Shop />
  </>
);

export default test1;
