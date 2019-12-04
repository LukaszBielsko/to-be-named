import React from 'react';
import styled from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';

// Router.events.on('routeChangeStart', console.log('handleRouteChange'))
const nprogressStart = url => {
    NProgress.start()
    console.log('start')
}

Router.events.on('routeChangeStart', nprogressStart)

const nprogressDone = url => {
    NProgress.done()
    console.log('done')
}

Router.events.on('routeChangeComplete', nprogressDone)

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