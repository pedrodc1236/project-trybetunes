import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../Componentes/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Componentes/MusicCard';
import Loading from '../Componentes/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './Album.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      objAlbum: [],
      mount: false,
      nameArtist: '',
      nameAlbum: '',
      imgAlbum: '',
      loading: true,
      favMusics: [],
    };
  }

  componentDidMount() {
    this.setState({ mount: true }, () => {
      this.haddleAlbum();
      this.haddleFavoriteSongs();
    });
  }

  haddleAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const { mount } = this.state;
    const albumAwait = await getMusics(id);
    if (mount) {
      this.setState({
        objAlbum: albumAwait,
        nameArtist: albumAwait[0].artistName,
        nameAlbum: albumAwait[0].collectionName,
        imgAlbum: albumAwait[0].artworkUrl100,
      });
    }
  }

  haddleFavoriteSongs = async () => {
    const favMusics = await getFavoriteSongs();
    this.setState(
      {
        favMusics,
      },
      () => {
        this.setState({
          loading: false,
        });
      },
    );
  };

  render() {
    const {
      objAlbum,
      nameArtist,
      nameAlbum,
      imgAlbum,
      loading,
      favMusics,
    } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <p>Album</p>
        <Header />

        <section className="album-section">
          <img src={ imgAlbum } alt={ nameArtist } />
          <p data-testid="artist-name">{ nameArtist }</p>
          <p data-testid="album-name">{ nameAlbum }</p>
        </section>

        <section className="music-section">
          { objAlbum.map((music, index) => {
            if (index > 0) {
              return (
                <MusicCard
                  key={ music.trackName }
                  music={ music }
                  favMusics={ favMusics }
                />
              );
            } return null;
          })}
        </section>

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
