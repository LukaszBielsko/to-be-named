import react, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Item from '../components/Item';

const GET_STREET_ARTS = gql`
   {  
        getStreetArts{
            title
        }
    }
`

class Items extends Component {
    render() {

        return (
            <div>
                <p>items</p>
                <Query query={GET_STREET_ARTS}>
                    {
                        ({ data, error, loading }) => {
                            if (error) return `error: ${error.message}`
                            if (loading) return '... loading ...'
                            return <div>
                                {data.getStreetArts.map(item => {
                                    return <p>{item.title}</p>
                                })}
                            </div>
                        }
                    }
                </Query>

            </div>
        )
    }
}

export default Items;