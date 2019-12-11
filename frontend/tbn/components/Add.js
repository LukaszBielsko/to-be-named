import React, { Component } from 'react'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


const ADD_ITEM_MUTATION = gql`
            mutation add_item(
                    $title: String
                    $place: String
                    $description: String
                ){
                createItem(
                    title: $title
                    place: $place
                    description: $description
                ) 
            }
        `


class Add extends Component {

    state = {
        title: '',
        description: '',
        place: ''
    }


    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    render() {

        return (
            <>
                <Mutation mutation={ADD_ITEM_MUTATION}>
                    {
                        (add_item, { data, error }) => (
                            <form onSubmit={async evt => {
                                evt.preventDefault()
                                await add_item(
                                    {
                                        variables:
                                        {
                                            title: this.state.title,
                                            place: this.state.place,
                                            description: this.state.description
                                        }
                                    }
                                )
                            }}>
                                <fieldset>

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
                                            placeholder="Enter A Description"
                                            required
                                            value={this.state.description}
                                            onChange={this.handleChange}
                                        />
                                    </label>

                                    <label htmlFor="place">
                                        place
                                <input
                                            id="place"
                                            name="place"
                                            placeholder="Enter A Description"
                                            required
                                            value={this.state.place}
                                            onChange={this.handleChange}
                                        />
                                    </label>

                                    <button type="submit">Submit</button>

                                </fieldset >
                            </form>
                        )
                    }
                </Mutation>
            </>
        )
    }
}

export default Add;


{/* <label htmlFor="file">
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
</label> */}