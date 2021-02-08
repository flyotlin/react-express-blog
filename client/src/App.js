import { BrowserRouter, Route, Switch, Link, useRouteMatch, useParams } from 'react-router-dom';
import Home from './Component/Home';
import User from './Component/User';
import PageNotFound from './Component/PageNotFound';
import AddArticle from './Component/AddArticle';

const App = () => {
  return (
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
};

export default App;