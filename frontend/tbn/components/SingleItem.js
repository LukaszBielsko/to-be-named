import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from 'styled-components';

const StyledSingleItem = styled.div`
  display: flex;
  .image {

  }
  .info {

  }
`

class SingleItem extends Component {
  render() {
    return (
      <StyledSingleItem>
        <div className="image">this is image</div>
        <div className="info">
          <p>title</p>
          <p>place</p>
          <p>desc</p>
        </div>
      </StyledSingleItem>
    )
  }
}
export default SingleItem;
