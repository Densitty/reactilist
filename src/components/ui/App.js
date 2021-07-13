import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import theme from "./Theme";
import Header from "./Header";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={() => <div>Home</div>} />
          <Route path="/services" component={() => <div>Services</div>} />
          <Route path="/revolution" component={() => <div>Revolution</div>} />
          <Route
            path="/custom-software"
            component={() => <div>Custom Software</div>}
          />
          <Route path="/mobile-apps" component={() => <div>Mobile Apps</div>} />
          <Route path="/websites" component={() => <div>Websites</div>} />
          <Route path="/about" component={() => <div>About Us</div>} />
          <Route path="/contact" component={() => <div>Contact Us</div>} />
          <Route path="/estimate" component={() => <div>Estimate</div>} />
          <Route
            exact
            path="*"
            component={() => <div>Error! Page Not Found</div>}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
