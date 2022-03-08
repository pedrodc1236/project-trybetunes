import React, { Component } from 'react';
import Header from '../Componentes/Header';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <p>Favorites</p>
        <Header />
      </div>
    );
  }
}

export default Favorites;
