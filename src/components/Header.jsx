import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  componentDidMount() {
    getUser().then((data) => this.setState({ name: data }));
  }

  render() {
    const { name } = this.state;
    return (
      <div>
        <div>
          {!name ? (
            <Loading />
          ) : (
            <div>
              <header data-testid="header-component">
                <div className="header-user-content">
                  <h3
                    className="header-name"
                    data-testid="header-user-name"
                  >
                    {`${name.name}`}
                  </h3>
                </div>
              </header>
              <nav className="nav-list">
                <ul>
                  <li className="nav-item">
                    <Link
                      to="/search"
                      data-testid="link-to-search"
                    >
                      Search
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/favorites"
                      data-testid="link-to-favorites"
                    >
                      Favorites
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      data-testid="link-to-profile"
                    >
                      Profile
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
// Auxiliado pelo William Alves -Turma 17
