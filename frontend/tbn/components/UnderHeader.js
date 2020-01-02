import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  width: 100%;
  background-color: #ebedee;
  border-top: 1px solid darkgray;
  border-bottom: 2px solid darkgray;
  display: flex;
  justify-content: space-evenly;

  section {
    padding: 5px;
  }
`;

const UnderHeader = props => (
  <Header>
    <section>some marketing info here</section>
    <section>some marketing info here</section>
    <section>some marketing info here</section>
  </Header>
);

export default UnderHeader;
