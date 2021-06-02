import React from "react";
import Layout from "./HOC/Layout";
import { Switch, Route } from "react-router-dom";

import Home from "./Components/Home";
import SignIn from "./Components/Signin";
import Dashboard from "./Components/Admin/Dashboard";

import PrivateRoutes from "./Components/AuthRoutes/PrivateRoutes";
import PublicRoutes from "./Components/AuthRoutes/PublicRoutes";

const Routes = (props) => {
  console.log(props);
  return (
    <Layout>
      <Switch>
        {/* Dashboard is a private route but can be accessed by anyone upon entering the url like below */}
        {/* <Route exact path="/dashboard" component={Dashboard}></Route> */}
        {/* instead, we do below to protect our private route */}
        <PrivateRoutes
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />

        {/* if a user is logged in, it shouldn't have access to '/sign_in' again; hence the reason for using restricted as props to help restrict access to '/sign_in' */}
        <PublicRoutes
          {...props}
          restricted={false}
          path="/"
          exact
          component={Home}
        />

        <PublicRoutes
          {...props}
          restricted={true}
          path="/sign_in"
          exact
          component={SignIn}
        />

        {/* Public Routes set below are not redone as above */}
        {/* <Route exact path="/sign_in" component={SignIn}>
          <SignIn />
        </Route>

        <Route exact path="/">
          <Home />
        </Route> */}
      </Switch>
    </Layout>
  );
};

export default Routes;

/* 

*/
