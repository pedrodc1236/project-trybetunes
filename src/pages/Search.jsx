import React, { Component } from 'react';
import Header from '../Componentes/Header';
import './Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = ({
      inputSearch: '',
      disabled: true,
    });
  }

  // Função para verificar se a quantidade de caracters digitados no input é maior ou igual a 2, se for, tornar o disabled false para que o botão seja habilitado.
  haddleBtnDisabled = () => {
    const TWO_CARACTERS = 2;
    const { inputSearch } = this.state;
    if (inputSearch.length >= TWO_CARACTERS) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  }

  // Função para pegar o target a cada tecla apertada, o state inputSearch que tem o mesmo nome do input tenha o valor do que for digitado no input, fazendo com que o valor seja atribuido ao state inputSearch e depois esse mesmo state é passado como valor para o value do input, além disso após cada atualização do state atraves do evento change, é chamada a função haddleBtnDisabled para verificar se o botão pode ou nao ser habilitado.
  haddleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.haddleBtnDisabled);
  }

  render() {
    const {
      inputSearch,
      disabled,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form id="search-form">
          <label htmlFor="input-search">
            <input
              id="input-search"
              name="inputSearch"
              type="text"
              placeholder="Nome do Artista"
              value={ inputSearch }
              onChange={ this.haddleChange }
              data-testid="search-artist-input"
            />
          </label>

          <button
            type="submit"
            id="btn-search"
            disabled={ disabled }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>

        </form>
      </div>
    );
  }
}

export default Search;
