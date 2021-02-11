import React from 'react';
import {
  BrowserRouter, Route, Switch, Link,
} from 'react-router-dom';
import Home from './Component/Home';
import PageNotFound from './Component/PageNotFound';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Link to="/home">Enter the blog!</Link>
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default App;
