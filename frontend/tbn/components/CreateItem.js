import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import styled, { keyframes } from "styled-components";
import Router from "next/router";

import Form from './styles/form';

/*  
  store query in a const
  use mutation keyword
  name mutation the same as const (for tests) 
  name variables ($) and determine the type
  call mutation (has to match the graphql schema)
  assign variables to fields
  return what you need
*/
const ADD_ITEM_MUTATION = gql`
  mutation add_item(
    $title: String!
    $place: String!
    $description: String!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      place: $place
      description: $description
      image: $image
      largeImage: $largeImage
    ) {
      title
      _id
      place
    }
  }
`;

class Add extends Component {
  state = {
    title: "",
    description: "",
    place: "",
    image: "",
    largeImage: ""
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  /* TODO go thrugh this function again and again  */

  uploadFile = async evt => {
    const files = evt.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "street-art");

    const res = await fetch("https://api.cloudinary.com/v1_1/lukwal/upload", {
      method: "POST",
      body: data
    });

    const file = await res.json();
    console.log(file);
    this.setState({
      image: file.secure_url,
      largeImage: file.eager[0].secure_url
    });
  };

  render() {
    return (
      <>
        <Mutation mutation={ADD_ITEM_MUTATION}>
          {(add_item, { loading, error }) => (
            <Form
              onSubmit={async evt => {
                evt.preventDefault();
                const res = await add_item({
                  variables: {
                    title: this.state.title,
                    place: this.state.place,
                    description: this.state.description,
                    image: this.state.image,
                    largeImage: this.state.largeImage
                  }
                });
                if (error) return <p>{error.message}</p>;
                Router.push({
                  pathname: "/item",
                  query: { id: res.data.createItem._id }
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
                    // required
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
                    value={this.state.place}
                    onChange={this.handleChange}
                  />
                </label>

                <label htmlFor="file">
                  <input name="file" type="file" onChange={this.uploadFile} />
                </label>

                {this.state.image && <img src={this.state.image} />}

                <button type="submit">Submit</button>
              </fieldset>
            </Form>
          )}
        </Mutation>
      </>
    );
  }
}

export default Add;

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
