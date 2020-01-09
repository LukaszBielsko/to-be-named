import React from 'react';
import PleaseSignIn from '../components/PleaseSignIn';

const test1 = props => (
  <PleaseSignIn message="This is test message :) if you are not logged in">
    <p>you are logged in, mate</p>
  </PleaseSignIn>
);

export default test1;
