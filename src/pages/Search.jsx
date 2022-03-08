import React, { Component } from 'react';
import Header from '../Componentes/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <p>Search</p>
        <Header />
      </div>
    );
  }
}

export default Search;
