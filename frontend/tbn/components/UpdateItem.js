import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import styled, { keyframes } from "styled-components";
import Router from "next/router";

const Form = styled.form`
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
`;

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: String!
    $title: String
    $place: String
    $description: String
  ) {
    updateItem(
      title: $title
      place: $place
      description: $description
      id: $id
    ) {
      title
      _id
      place
    }
  }
`;

/* 
  assing query to const
  use query keyword for named query
  name the query the same as const (tests)
  determine types of variables ($)
  call query (defined in graphql schema)
  pass variables to query (id: $id)
  return what you need
*/

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: String!) {
    item(id: $id) {
      title
      place
      description
    }
  }
`;

class UpdateItem extends Component {
  state = {};

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, loading }) => {
          if (loading) return <p>...loading...</p>;
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION}>
              {(updateItem, { loading, error }) => (
                <Form
                  onSubmit={async evt => {
                    evt.preventDefault();
                    const res = await updateItem({
                      variables: {
                        id: this.props.id,
                        title: this.state.title,
                        place: this.state.place,
                        description: this.state.description
                      }
                    });
                    if (error) return <p>{error.message}</p>;
                    Router.push({
                      pathname: "/item",
                      query: { id: this.props.id }
                    });
                  }}
                >
                  <fieldset disabled={false}>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        required
                        defaultValue={data.item.title}
                        value={this.state.title}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="description">
                      Description
                      <input
                        id="description"
                        name="description"
                        placeholder="Very short description please ;)"
                        required
                        defaultValue={data.item.description}
                        value={this.state.description}
                        onChange={this.handleChange}
                      />
                    </label>

                    <label htmlFor="place">
                      Place
                      <input
                        id="place"
                        name="place"
                        placeholder="Where did you find it?"
                        required
                        defaultValue={data.item.place}
                        value={this.state.place}
                        onChange={this.handleChange}
                      />
                    </label>
                    <button type="submit">Save changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default UpdateItem;

{
  /* <label htmlFor="file">
    Image
                                <input
        type="file"
        id="file"
        name="file"
        placeholder="Price"
        required
        // value={this.state.image}
        onChange={this.uploadFile}
    />
</label> */
}
