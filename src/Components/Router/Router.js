import React from 'react';
import { Router, Switch, Route, Redirect } from "react-router-dom";

import App from "../../App";
import history from '../../history';

function RouterFile() {
  return (
    <Router history={history}>
      <Switch>
        <Route
          exact path="/"
          render={() => (
            <App />
          )} />
      {/*   <Route
          exact path="/favorites"
          render={(match) => (
            <App />
          )} /> */}
       
        <Route
          exact path="/:tab(cinemas|favorites)/:id"
          render={(match) => (
            <App
              cinemaID={match.id}
            />
          )} />
         {/* <Route
          exact path="/cinemas"
          render={() => (
            <App />
          )} />*/}
        <Redirect to="/" /> 
      </Switch>
    </Router>
  )

}

export default RouterFile

