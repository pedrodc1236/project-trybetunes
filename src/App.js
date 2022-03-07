import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <nav>
          <Link to="/">Login </Link>
          <Link to="/search">Search </Link>
          <Link to="/album/:id">Album </Link>
          <Link to="/favorites">Favorites </Link>
          <Link to="/profile">Profile </Link>
          <Link to="/profile/edit">ProfileEdit </Link>
        </nav>

        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
