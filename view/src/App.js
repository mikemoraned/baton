import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Id } from "./pages/Id";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/id/:id">
            <Id />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
