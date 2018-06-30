import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import Game from "./Game";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      'games': []
    };
  }

  componentDidMount() {
    fetch("/api/players/playerA")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            games: result.games
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  render() {
    const { games } = this.state;
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
            <div className="columns">
              {
                games.map((game) => {
                  return <div className="column">
                    <Game url={`/api/games/${game.id}`}/>
                  </div>
                })
              }
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="container">
            <div className="content has-text-centered">
              <p>
                <strong>Baton</strong> by <a href="http://houseofmoran.com/">Mike Moran</a>.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
