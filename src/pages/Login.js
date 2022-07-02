import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const { userInfo, updateState, checkInputLength, buildUser,
      loadScreen, redirectSearch } = this.props;
    return (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          type="text"
          value={ userInfo }
          onChange={ updateState }
          id=""
          name="name"
        />
        <button
          data-testid="login-submit-button"
          type="button"
          disabled={ checkInputLength }
          onClick={ buildUser }
          id=""
          name=""
        >
          Entrar
        </button>

        {
          loadScreen
            && <p>Carregando...</p>
        }

        {
          redirectSearch
            && <Redirect to="/search" />
        }

      </div>
    );
  }
}

Login.propTypes = {
  userInfo: PropTypes.string.isRequired,
  updateState: PropTypes.func.isRequired,
  checkInputLength: PropTypes.bool.isRequired,
  buildUser: PropTypes.func.isRequired,
  loadScreen: PropTypes.bool.isRequired,
  redirectSearch: PropTypes.bool.isRequired,
};

export default Login;
