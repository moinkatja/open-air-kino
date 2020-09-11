import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import App from "../../App";


const Router = (props) => (

  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/cinemas" exact component={App} />
      <Route path="/cinemas/:id" component={App} />
      <Route path="/favorites" component={App} />
      {/* <Redirect path="/" /> */}
    </Switch>
  </BrowserRouter>
);

export default Router;
