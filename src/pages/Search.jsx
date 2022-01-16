import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disabledButton: true,
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
    });
  }

  render() {
    const { name, disabledButton } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <form>
            <label htmlFor="input-seach-name">
              <input
                data-testid="search-artist-input"
                type="text"
                name="name"
                value={ name }
                onChange={ this.handleChance }
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ disabledButton }
              >
                Pesquisar
              </button>
            </label>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;
