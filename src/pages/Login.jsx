import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <section className="login-content">
        <label htmlFor="ogin-name-input">
          <input
            data-testid="login-name-input"
            type="text"
            name=""
            id="ogin-name-input"
          />
        </label>
        <button
          data-testid="login-submit-button"
          type="submit"
        >
          Entrar
        </button>
        </section>
      </div>
    );
  }
}

export default Login;
