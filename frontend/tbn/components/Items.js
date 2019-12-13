import react, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import Item from '../components/Item';

const GET_STREET_ARTS = gql`
   {  
        getStreetArts{
            title
            description
            place
            image
            largeImage
            _id
        }
    }
`

const StyledItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`

class Items extends Component {
    render() {

        return (
            <StyledItems>
                <Query query={GET_STREET_ARTS}>
                    {
                        ({ data, error, loading }) => {
                            if (error) return `error: ${error.message}`
                            if (loading) return '... loading ...'
                            return <>
                                {data.getStreetArts.map(item => {
                                    return <Item {... item}/>
                                })}
                            </>
                        }
                    }
                </Query>

            </StyledItems>
        )
    }
}

export default Items;