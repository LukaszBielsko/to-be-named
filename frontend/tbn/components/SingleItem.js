import React, { Component } from "react";
import { Query } from "react-apollo";
import styled from 'styled-components';
import gql from 'graphql-tag';
import Head from 'next/head';

const StyledSingleItem = styled.div`
  display: flex;
  img {
    width: 30%
  }
  span {
    font-size: 1.5rem;
  }
  .info {
    padding-left: 30px;
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
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          if (loading) return <p>...loading...</p>
          if (!data) return <p>no item found</p>
          return <StyledSingleItem>
            <Head>
              <title> {data.item.title} </title>
            </Head>
            <img src={data.item.largeImage} alt="art :)" />
            <div className="info">
              <p><span>title</span> {data.item.title}</p>
              <p><span>place</span> {data.item.place}</p>
              <p><span>description</span> {data.item.description}</p>
            </div>
          </StyledSingleItem>
        }}
      </Query>
    )
  }
}
export default SingleItem;
