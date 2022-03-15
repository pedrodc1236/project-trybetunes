import React, { Component } from 'react';
import Header from '../Componentes/Header';
import Loading from '../Componentes/Loading';
import MusicCard from '../Componentes/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favTracks: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.handleRestoreFavorites();
  }

  handleRestoreFavorites = () => {
    this.setState({
      loading: true,
    }, async () => {
      const favMusics = await getFavoriteSongs();
      console.log(favMusics);
      this.setState({
        favTracks: favMusics,
        loading: false,
      });
    });
  }

  render() {
    const {
      favTracks,
      loading,
    } = this.state;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          <p>Musicas Favoritas:</p>
          { favTracks.map((track) => (
            <MusicCard
              key={ track.name }
              music={ track }
              favMusics={ favTracks }
              func={ this.handleRestoreFavorites }
            />
          )) }
        </div>
      </div>
    );
  }
}

export default Favorites;
