import React, { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
