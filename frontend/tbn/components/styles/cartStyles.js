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
  .close-btn {
    font-size: 3rem;
     padding: 10px;
  position: absolute;     
  right: 20px;
  }
`;

export default CartStyles;
