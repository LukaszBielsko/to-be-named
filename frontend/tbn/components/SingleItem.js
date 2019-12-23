import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from 'styled-components';
import gql from 'graphql-tag';

const StyledSingleItem = styled.div`
  display: flex;
  .image {

  }
  .info {

  }
`

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY ($id: String!){
    item(id: $id){
      image
      largeImage
      title
      place
      description
    }
  }
`

class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY}>
        {() => (
          <StyledSingleItem>
            <div className="image">this is image</div>
            <div className="info">
              <p>title</p>
              <p>place</p>
              <p>desc</p>
            </div>
          </StyledSingleItem>
        )}
      </Query>
    )
  }
}
export default SingleItem;
