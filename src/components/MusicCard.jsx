import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      inputFavorite: false,
      loading: false,
    };
  }

  handleChange = (event) => {
    const { type, name, value, checked } = event.target;
    const songType = type === 'checkbox' ? checked : value;
    this.setState({
      loading: true,
      [name]: songType,
    });
    this.HandleApi().then(() => {
      this.setState({
        loading: false,
      });
    });
  }

  HandleApi = async () => {
    const {
      trackId,
      trackName,
      previewUrl,
    } = this.props;
    await addSong({ trackId, trackName, previewUrl });
  }

  render() {
    const { music } = this.props;
    const { inputFavorite, loading } = this.state;
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
            value={ inputFavorite }
            onClick={ this.handleChange }
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
