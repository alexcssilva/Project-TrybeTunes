import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
      favoriteSong: [],
    };
  }

  componentDidMount() {
    getFavoriteSongs().then((favorite) => {
      this.setState({
        favoriteSong: favorite,
      }, this.favoriteChange);
    });
  }

  favoriteChange = () => {
    const { music } = this.props;
    const { favoriteSong } = this.state;
    const favoriteTrue = favoriteSong.some((equal) => equal.trackId === music.trackId);
    if (favoriteTrue) {
      this.setState({
        checked: favoriteTrue,
      });
    }
  }

  handleChange = (event) => {
    const { checked } = event.target;
    this.setState({
      loading: true,
      checked,
    }, this.HandleApi);
  }

  HandleApi = () => {
    const { music } = this.props;
    const { checked } = this.state;
    if (checked) {
      addSong(music).then(() => {
        this.setState({
          loading: false,
        });
      });
    } else {
      removeSong(music);
    }
  }

  render() {
    const { music } = this.props;
    const { checked, loading } = this.state;
    return (
      <div>
        <p
          className="track-name-music"
        >
          { music.trackName }
        </p>
        <audio
          className="track-preview"
          data-testid="audio-component"
          src={ music.previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor="checkbox-music"
        >
          Favorita
          { loading ? <Loading /> : '' }
          <input
            data-testid={ `checkbox-music-${music.trackId}` }
            type="checkbox"
            name="inputFavorite"
            checked={ checked }
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;

export default MusicCard;
// Desafio 7 Auxiliado pelo o colega Jonatas Lima - Turma 17
// Desafio 9 e 10 auxliado pelo os colegas William Alves e Jonatas Lima - turma 17