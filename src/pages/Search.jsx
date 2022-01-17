import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disabledButton: true,
      loading: '',
      artistList: [],
      artistName: '',
    };
  }

  handleChance = (event) => {
    const { name, value } = event.target;
    const TWO = 2;
    if (value.length >= TWO) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
    this.setState({
      [name]: value,
      artistName: value,
    });
  }

  handleClick = (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({
      loading: false,
      name: '',
    });
    searchAlbumsAPI(name)
      .then((albums) => this.setState({
        loading: true,
        artistList: albums,
      }));
  }

  render() {
    const { disabledButton, loading, name, artistList, artistName } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          {(loading === false)
            ? (<Loading />)
            : (
              <form>
                <label htmlFor="input-seach-name">
                  <input
                    placeholder="Nome do Artista"
                    className="input-search"
                    data-testid="search-artist-input"
                    type="text"
                    name="name"
                    value={ name }
                    onChange={ this.handleChance }
                  />
                  <button
                    className="search-button"
                    type="submit"
                    data-testid="search-artist-button"
                    disabled={ disabledButton }
                    onClick={ this.handleClick }
                  >
                    Pesquisar
                  </button>
                </label>
              </form>
            )}
          <section>
            {(artistList.length > 0)
              ? (
                <section>
                  {
                    <p
                      className="search-result"
                    >
                      {`Resultado de álbuns de: ${artistName}`}
                    </p>
                  }
                  {artistList.map((artist) => (
                    <div key={ artist.collectionId }>
                      <Link
                        to={ `/album/${artist.collectionId}` }
                        data-testid={ `link-to-album-${artist.collectionId}` }
                      >
                        <div className="album">
                          <img
                            className="image-album"
                            src={ artist.artworkUrl100 }
                            alt={ artist.collectionName }
                          />
                          <div className="name-album">
                            <h5>{ artist.collectionName }</h5>
                            <h3>{ artist.artistName }</h3>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </section>
              ) : ''}
            {(loading && artistList.length === 0)
              ? <p className="search-result">Nenhum álbum foi encontrado</p>
              : ''}
          </section>
        </div>
      </div>
    );
  }
}

export default Search;
// Requisito 6 auxiliado pelo o colega William Alves - Turma 17
