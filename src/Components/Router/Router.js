import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import App from "../../App";
import CinemaProfile from "../CinemaProfile/CinemaProfile";

const Router = () => (

  <BrowserRouter>
    <Switch>
      <Route path="/cinema/:id" exact component={CinemaProfile} />  
      <Route path="/"  component={App} exact />
      <Redirect to="/" /> 
    </Switch>
  </BrowserRouter>
);

export default Router;
