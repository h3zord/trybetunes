import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      userInfo: {
        name: '',
      },
      checkInputLength: true,
      loadScreen: false,
      redirectSearch: false,
    };
  }

  updateState = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      userInfo: {
        [name]: value,
      },
    }, () => { this.checkInputValueLength(); });
  }

  checkInputValueLength = () => {
    const { userInfo: { name } } = this.state;
    const minLength = 3;
    if (name.length >= minLength) this.setState({ checkInputLength: false });
    else this.setState({ checkInputLength: true });
  }

  buildUser = () => {
    const { userInfo } = this.state;
    this.setState({ loadScreen: true }, async () => {
      await createUser(userInfo);
      this.setState({ loadScreen: false, redirectSearch: true });
    });
  }

  render() {
    const { userInfo: { name }, checkInputLength, loadScreen,
      redirectSearch } = this.state;
    const { updateState, buildUser } = this;

    if (loadScreen) return <Loading />;

    return (
      <div data-testid="page-login">
        <input
          data-testid="login-name-input"
          type="text"
          value={ name }
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
          redirectSearch
            && <Redirect to="/search" />
        }

      </div>
    );
  }
}

export default Login;
