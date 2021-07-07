import React from "react";
import "./index.css";
import Home from "./components/Home";
// import Game from "./components/Game";
import Game from "./components/FunctionalGame";
import HighScores from "./components/HighScores";
import { Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Route exact path="/" component={Home} />
          <Route path="/game" component={Game} />
          <Route path="/highScores" component={HighScores} />
        </div>
      </Router>
    </div>
  );
}

export default App;
