import styled from 'styled-components';

export default styled.form`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border: 5px solid white;
  border-radius: 3px;
  padding: 10px;
  font-size: 3rem;
  width: 80%;
  margin: auto;
  text-align: center;
  label {
    display: block;
    margin-bottom: 20px;
  }
  input {
    width: 80%;
    margin: auto;
    border: 1px solid black;
    display: block;
    font-size: 1.7rem;
    padding: 10px;
    border-radius: 3px;
  }
  input[type="file"] {
    width: 40%;
    border: 0;
  }
  fieldset {
    border: 0;
    &[disabled] {
      opacity: 0.5;
    }
    }
  }
  button {
    box-shadow: inset 0px 1px 0px 0px #ffffff;
    background: linear-gradient(to bottom, #ffffff 5%, #f6f6f6 100%);
    background-color: #ffffff;
    border-radius: 3px;
    border: 1px solid black;
    display: inline-block;
    cursor: pointer;
    color: black;
    font-size: 24px;
    font-weight: 400;
    padding: 6px 24px;
    text-decoration: none;
    text-shadow: 0px 1px 0px #ffffff;
  }
  button:hover {
    background: linear-gradient(to bottom, #f6f6f6 5%, #ffffff 100%);
    background-color: #f6f6f6;
  }
  button:active {
    position: relative;
    top: 1px;
  }
`