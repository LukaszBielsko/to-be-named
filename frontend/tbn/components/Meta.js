import Head from 'next/head';

const Meta = (props) => (
    <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/static/favicon.png" />
        <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
        <title>To be named!</title>
        {/* <script type="text/javascript" src="https://kit.fontawesome.com/5407aa4f74.js" crossorigin="anonymous"></script> -- does not work*/}
        <link href="https://fonts.googleapis.com/css?family=Inconsolata:400,700&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,500,700&display=swap" rel="stylesheet"></link>
    </Head>
)

export default Meta;