import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      nameUser: null,
    };
  }

  componentDidMount() {
    this.haddleGetUser();
  }

  haddleGetUser = async () => {
    const user = await getUser();
    this.setState({
      nameUser: user,
    });
  }

  render() {
    const {
      nameUser,
    } = this.state;
    return (
      <header className="header-div" data-testid="header-component">
        {!nameUser
          ? <Loading />
          : <p className="name-user" data-testid="header-user-name">{ nameUser.name }</p>}

        <nav className="nav-links">
          <Link
            className="link-1"
            data-testid="link-to-search"
            to="/search"
          >
            Pesquisa
          </Link>
          <Link
            className="link-2"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritas
          </Link>
          <Link
            className="link-3"
            data-testid="link-to-profile"
            to="/profile"
          >
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
