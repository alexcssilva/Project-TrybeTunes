import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disabledButton: true,
      loading: false,
      login: false,
    };
  }

  handleChance = (event) => {
    const { name, value } = event.target;
    const THREE = 3;
    if (value.length >= THREE) {
      this.setState({ disabledButton: false });
    } else {
      this.setState({ disabledButton: true });
    }
    this.setState({
      [name]: value,
    });
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      loading: true,
      login: true,
    });
  }

  render() {
    const { name, disabledButton, loading, login } = this.state;
    return (
      <div data-testid="page-login">
        {(loading) ? (<Loading />) : ''}
        <form className="login-content">
          <label htmlFor="ogin-name-input">
            <input
              placeholder="Nome"
              data-testid="login-name-input"
              type="text"
              name="name"
              value={ name }
              id="ogin-name-input"
              onChange={ this.handleChance }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ disabledButton }
            onClick={ this.handleClick }
            loading
          >
            Entrar
          </button>
          {(login) ? <Redirect to="/search" /> : ''}
        </form>
      </div>
    );
  }
}

export default Login;
