import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { GET_STREET_ARTS } from "./Items";

const DELETE_ITEM = gql`
  mutation DELETE_ITEM($id: String!) {
    deleteItem(id: $id) {
      _id
    }
  }
`;

class DelteItem extends Component {
  /* TODO not a to do but a reminder ;) how to update the cache */

  update = (cache, payload) => {
    // manually update the cache on the client that it matches the one on the server
    // read the cache for the items we want
    const data = cache.readQuery({
      query: GET_STREET_ARTS
    });
    // remove  item from cache
    console.log("cache data", data);
    data.items = data.items.filter(
      item => item._id !== payload.data.deleteItem._id
    );
    // update cache
    console.log("new data after filter", data);
    /*
      FIXME - won't update the cache
      im not getting cached data, 
      but cached data with the item already deleted 
      maybe it is because different versions of apollo
      hooks vs class methods etc
      i'm leaving this at it is for now
    */
    cache.writeQuery({
      query: GET_STREET_ARTS,
      data
    });
  };

  render() {
    return (
      <Mutation mutation={DELETE_ITEM} update={this.update}>
        {(deleteItem, { loading, error }) => {
          return (
            <button
              onClick={() => {
                if (confirm("R U sure you wanne delete this?")) {
                  deleteItem({ variables: { id: this.props.id } });
                }
              }}
            >
              {" "}
              {this.props.children}
            </button>
          );
        }}
      </Mutation>
    );
  }
}

export default DelteItem;
