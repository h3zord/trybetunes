import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
// import Loading from '../Components/Loading';
import './login.css';
import logo from '../images/logo.svg';

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
    const {
      // eslint-disable-next-line no-unused-vars
      userInfo: { name }, checkInputLength, loadScreen, redirectSearch,
    } = this.state;
    const { updateState, buildUser } = this;

    // if (loadScreen) return <Loading />;

    return (
      <div data-testid="page-login" className="page-login">
        <div className="login-container">
          <div className="logo-container">
            <img src={ logo } alt="logo-img" />
          </div>
          <div className="form-container">
            <input
              data-testid="login-name-input"
              type="text"
              value={ name }
              onChange={ updateState }
              className="input-name"
              name="name"
              placeholder="Qual é o seu nome?"
            />
            <button
              data-testid="login-submit-button"
              type="button"
              disabled={ checkInputLength }
              onClick={ buildUser }
              id=""
              name=""
            >
              ENTRAR
            </button>

            {
              redirectSearch
                && <Redirect to="/search" />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
