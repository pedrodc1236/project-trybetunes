import React, { Component } from 'react';
import Header from '../Componentes/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <p>Album</p>
        <Header />
      </div>
    );
  }
}

export default Album;
