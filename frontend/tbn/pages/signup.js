import React from 'react';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';
import RequestReset from '../components/RequestReset';

const signUp = props => (
  <>
    <SignUp />
    <SignIn />
    <RequestReset />
  </>
);

export default signUp;
