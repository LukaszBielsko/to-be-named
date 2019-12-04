import React from 'react';

import Header from './Header';
import styled, { createGlobalStyle} from 'styled-components';
import UndeHeader from './UnderHeader';
import Meta from './Meta';


const Page = (props) => {


    const GlobalStyle = createGlobalStyle`
    html {
       box-sizing: border-box;
       font-size: 10px;
    }
    *, *:before, *:after {
        box-sizing: inherit;
    }
    body {
        font-family: monospace;
        padding: 0;
        margin: 0;
        font-size: 2rem;
        line-height: 1.5;
    }
    `
    // inner div for centering whatever is rendered from Link
    const Inner = styled.div`
        border: 1p solid greenyellow;
        max-width: 80%;
        margin: 0 auto;
        background: lightgoldenrodyellow;
        padding: 2rem;
    `;

    return (
        <div>
            <GlobalStyle/>
            <Meta/>
            <Header />
            <UndeHeader/>
            <Inner>
                {/* // what are children here?
                // it is Component in the _app.js file 
                // next.js magic renders whatever is clicked */}
                {props.children}
            </Inner>
        </div>
    );
};

export default Page;