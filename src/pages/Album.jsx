import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    getMusics(id)
      .then((albums) => this.setState({
        musicList: albums,
      }));
  }

  render() {
    const { musicList } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album" />
        {musicList.length > 0 && (
          <div>
            <div>
              <img
                className="album-image"
                src={ musicList[0].artworkUrl100 }
                alt={ musicList[0].collectionName }
              />
              <h5
                className="name-collection"
                data-testid="album-name"
              >
                { musicList[0].collectionName }
              </h5>
              <h4
                className="name-artist"
                data-testid="artist-name"
              >
                { musicList[0].artistName }
              </h4>
            </div>
            <div>
              { musicList.filter((song) => song.kind).map((music) => (
                <div key={ music.trackId }>
                  <MusicCard music={ music } />
                </div>
              )) }

            </div>
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string,
}.isRequired;

export default Album;
