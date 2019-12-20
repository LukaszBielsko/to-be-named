import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const DELETE_ITEM = gql`
  mutation DELETE_ITEM($id: String!) {
    deleteItem(id: $id) {
      title
    }
  }
`;

class DelteItem extends Component {
  render() {
    return (
      <Mutation mutation={DELETE_ITEM}>
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
