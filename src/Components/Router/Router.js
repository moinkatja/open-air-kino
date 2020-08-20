import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "../../App";
import CinemaProfile from "../CinemaProfile/CinemaProfile";

const Router = () => (
  
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="id"  component={CinemaProfile} />
    </Switch>
  </BrowserRouter>
);

export default Router;
