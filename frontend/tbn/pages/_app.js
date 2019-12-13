import App from "next/app";
import { ApolloProvider } from "react-apollo";
import withApolloData from "../lib/withApolloData";

import Page from "../components/Page";

class MyApp extends App {
  /* TODO what does it to exactly?  */
  /* this is next.js lifecycle method 
       this will run first before render actually happens
       and by returning sth, that sth will be available in the 
       rendered component   
    */
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    // get the id for page showing/updating
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    /* TODO where this component came from? */
    const { Component, apollo, pageProps } = this.props;

    return (
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withApolloData(MyApp); // makes apollo prop available for MyApp component
