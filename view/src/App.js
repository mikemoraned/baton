import React, { Component } from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import Game from "./Game";

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
            <div className="columns">
              <div className="column">
                <Game url={"http://baton.houseofmoran.io/"}/>
              </div>
              <div className="column">
                <Game url={"http://houseofmoran.com"}/>
              </div>
              <div className="column">
                <Game url={"http://baton.houseofmoran.io/"}/>
              </div>
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
