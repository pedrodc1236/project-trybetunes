import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
      prevChecked: false,
    };

    this.haddleAddSong = this.haddleAddSong.bind(this);
  }

  componentDidMount() {
    this.haddleGetFavSongs();
  }

  haddleGetFavSongs = () => {
    const { favMusics, music } = this.props;
    favMusics.forEach((favMusic) => {
      if (favMusic.trackId === music.trackId) {
        this.setState({
          checked: true,
        });
      }
    });
  }

  haddleAddSong() {
    const { music } = this.props;
    this.setState((prevState) => ({
      loading: true,
      prevChecked: prevState.checked,
      checked: !prevState.checked,
    }), async () => {
      const { prevChecked, checked } = this.state;
      if (prevChecked === false && checked === true) {
        await addSong(music);
        this.setState({
          loading: false,
        });
      } else if (prevChecked === true && checked === false) {
        await removeSong(music);
        const { func } = this.props;
        if (window.location.href.includes('favorites')) {
          func();
        }
        this.setState({
          loading: false,
        });
      }
    });
  }

  render() {
    const { music: { trackId, trackName, previewUrl } } = this.props;
    const { loading, checked } = this.state;
    if (loading) return <Loading />;
    return (
      <section className="track-card">
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor="music-checkbox">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id="music-checkbox"
            type="checkbox"
            checked={ checked }
            onChange={ this.haddleAddSong }
          />
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  favMusics: PropTypes.arrayOf(PropTypes.object).isRequired,
  func: PropTypes.func.isRequired,
};

export default MusicCard;
