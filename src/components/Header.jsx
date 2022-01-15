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
                <h3 data-testid="header-user-name">{`${name.name}`}</h3>
              </header>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
// Auxiliado pelo William Alves -Turma 17
