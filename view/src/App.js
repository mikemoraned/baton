import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import "./App.css";
import "bulma/css/bulma.css";

import Game from "./Game";

const GET_GAMES = gql`
  {
    games @client {
      url
    }
  }
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <section className="section">
          <div className="container">
            <h1 className="title">
              Hello World
            </h1>
            <p className="subtitle">
              My first website with <strong>Bulma</strong>!
            </p>
            <div>
              <Query query={GET_GAMES}>
                {({ data: { games } }) => (
                  games.map( game => (
                    <Game url={game.url} key={game.url} />
                  ))
                )}
              </Query>
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <p>
                <strong>Baton</strong> by <a href="http:/houseofmoran.com">Mike Moran</a>.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
