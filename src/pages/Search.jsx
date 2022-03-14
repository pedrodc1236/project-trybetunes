import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Componentes/Header';
import './Search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Componentes/Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = ({
      inputSearch: '',
      disabled: true,
      loading: false,
      newInputSearch: null,
      albums: [],
    });
  }

  haddleSearch = () => {
    const { inputSearch } = this.state;
    this.setState({
      loading: true,
      inputSearch: '',
      newInputSearch: inputSearch,
    }, async () => {
      const { newInputSearch } = this.state;
      const artistArrayObj = await searchAlbumsAPI(newInputSearch);
      this.setState({
        loading: false,
        albums: artistArrayObj,
      });
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
      loading,
      newInputSearch,
      albums,
    } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-search">
        <Header />
        <form className="search-form">
          <label htmlFor="input-search">
            <input
              className="input-search"
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
            className="btn-search"
            disabled={ disabled }
            data-testid="search-artist-button"
            onClick={ this.haddleSearch }
          >
            Pesquisar
          </button>
        </form>

        <section>
          { newInputSearch && <p>{ `Resultado de álbuns de: ${newInputSearch}` }</p> }
        </section>

        <section>
          { albums.length === 0 ? <p>Nenhum álbum foi encontrado</p> : (
            <section className="all-album">
              {
                albums.map((album) => (
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    className="link-all-album"
                    to={ `/album/${album.collectionId}` }
                    key={ album.collectionId }
                  >
                    <div className="album-div">
                      <img
                        src={ album.artworkUrl100 }
                        alt={ album.collectionName }
                      />
                      <p>{album.collectionName}</p>
                      <p>{album.artistName}</p>
                    </div>
                  </Link>
                ))
              }
            </section>
          )}
        </section>
      </div>
    );
  }
}

export default Search;
