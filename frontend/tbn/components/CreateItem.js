import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import styled, { keyframes } from "styled-components";
import Router from "next/router";

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
                  <input
                    name="file"
                    type="file"
                    required
                    onChange={this.uploadFile}
                  />
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
