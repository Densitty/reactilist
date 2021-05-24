import React from "react";
import Layout from "./HOC/Layout";
import { Switch, Route } from "react-router-dom";

import Home from "./Components/Home";

const Routes = (props) => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Layout>
  );
};

export default Routes;
