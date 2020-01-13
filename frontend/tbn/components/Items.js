import react, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import Item from './Item';

const GET_STREET_ARTS = gql`
  {
    items {
      title
      description
      place
      image
      largeImage
      _id
    }
  }
`;

const StyledItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

class Items extends Component {
  render() {
    return (
      <StyledItems>
        <Query query={GET_STREET_ARTS}>
          {({ data, error, loading }) => {
            if (error) return `error: ${error.message}`;
            if (loading) return <p>"... loading ..."</p>;
            return (
              <>
                {data.items.map(item => (
                  <Item {...item} key={item._id} />
                ))}
              </>
            );
          }}
        </Query>
      </StyledItems>
    );
  }
}

export default Items;
export { GET_STREET_ARTS };
