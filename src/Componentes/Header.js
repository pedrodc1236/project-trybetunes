import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <header data-testid="header-component">
        {!nameUser
          ? <Loading />
          : <p data-testid="header-user-name">{ nameUser.name }</p>}

        <nav>
          <Link data-testid="link-to-search" to="/search">Pesquisa</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
