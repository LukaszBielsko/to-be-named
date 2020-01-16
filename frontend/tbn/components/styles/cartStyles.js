import styled from 'styled-components';

const CartStyles = styled.div`
  color: black;
  padding: 20px;
  position: relative;
  background: white;
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 500px;
  bottom: 0;
  transform: translateX(100%);
  opacity: 50%;
  transition: all 0.9s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  ${props => props.open && `transform: translateX(0); opacity: 100%`};
  }
  .total-price {
    font-family: 'Inconsolata', monospace;
    line-height: 1.5;
    color: black;
    box-sizing: inherit;
    font-weight: bold;
    font-size: 2.9rem;
    display: inline-block;
    margin-top: 25px;
    margin-right: 50px;
 
  }
  .close-btn {
    font-size: 3rem;
    position: absolute;
    right: 35px;
    border-radius: 61%;
    background-color: lightgray;
  }
  .checkoutButton {
   background: rgb(28, 184, 65); /* this is a green */
   font-size: 2.9rem;
    letter-spacing: 2px;
    font-weight: 700;
    font-family: monospace;
    border-radius: 20px;
  }
`;

export default CartStyles;
