import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { GET_STREET_ARTS } from './Items';

const DELETE_ITEM = gql`
  mutation DELETE_ITEM($id: String!) {
    deleteItem(id: $id) {
      _id
    }
  }
`;

class DelteItem extends Component {
  /* TODO how to update the cache */
  // BUG products will still be visible after deletion
  update = (cache, payload) => {
    // manually update the cache on the client that it matches the one on the server
    // read the cache for the items we want
    const data = cache.readQuery({
      query: GET_STREET_ARTS,
    });
    // remove  item from cache
    data.items = data.items.filter(
      item => item._id !== payload.data.deleteItem._id
    );
    // update cache
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
      data,
    });
  };

  render() {
    const { id } = this.props;
    return (
      <Mutation mutation={DELETE_ITEM} update={this.update}>
        {(deleteItem, { loading, error }) => (
          <button
            type="button"
            onClick={() => {
              if (confirm('R U sure you wanne delete this?')) {
                deleteItem({ variables: { id } });
              }
            }}
          >
            {' '}
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DelteItem;
