import React, { Component } from 'react';
import Header from '../Componentes/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <p>Profile</p>
        <Header />
      </div>
    );
  }
}

export default Profile;
