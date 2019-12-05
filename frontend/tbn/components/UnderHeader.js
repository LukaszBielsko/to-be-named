import React from 'react';
import styled from 'styled-components';

const UndeHeader = (props) => {

    const UndeHeader = styled.div`
        width: 100%;
        background-color: #ebedee;
        border-top: 2px solid white;
        border-bottom: 2px solid white;
        display: flex;
        justify-content: center;
        section {
            padding: 10px;
        }
        `

    return (
        <UndeHeader>
            <section>
                some marketing info here 
            </section>
        </UndeHeader>
    );
};

export default UndeHeader;