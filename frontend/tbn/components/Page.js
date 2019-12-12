import React from 'react';

import Header from './Header';
import styled, { createGlobalStyle} from 'styled-components';
import UnderHeader from './UnderHeader';
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
        font-family: 'Inconsolata',monospace;
        padding: 0;
        margin: 0;
        font-size: 2rem;
        line-height: 1.5;
        background: #ebedee;

    }
    `
    // inner div for centering whatever is rendered from Link
    const Inner = styled.div`
        max-width: 90%;
        margin: 0 auto;
        /* background: lightgoldenrodyellow; */
        padding: 2rem;
    `;
    

    return (
        <div>
            <GlobalStyle/>
            <Meta/>
            <Header />
            <UnderHeader/>
            <Inner>
                {/*  what are children here?
                 it is Component in the _app.js file 
                 next.js magic renders whatever is clicked */}
                {props.children}
            </Inner>
        </div>
    );
};

export default Page;