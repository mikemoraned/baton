import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const typeDefs = `
  type Game {
    url: String!
  }

  type Query {
    games: [Game]
  }
`;

const defaults = {
    games: [
        {
            __typename: "Game",
            url: "http://foo.com/"
        },
        {
            __typename: "Game",
            url: "http://bar.com/"
        }
    ]
};

const resolvers = [];

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql",
  clientState: {
    defaults,
    resolvers,
    typeDefs
  }
});

const ApolloApp = () => (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );

ReactDOM.render(<ApolloApp />, document.getElementById('root'));
registerServiceWorker();
