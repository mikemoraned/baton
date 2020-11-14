import "./App.scss";
import { Home } from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Specific } from "./pages/Specific";

function App() {
  return (
    <div className="container">
      <div className="columns">
        <div className="column">
          <Router>
            <Switch>
              <Route path="/code">
                <Specific />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
