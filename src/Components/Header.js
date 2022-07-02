import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loadScreen: false,
      welcomeMsg: false,
      userInfo: {
        name: '',
      },
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({ loadScreen: true }, async () => {
      const promisse = await getUser();
      this.setState({
        loadScreen: false,
        welcomeMsg: true,
        userInfo: { name: promisse.name },
      });
    });
  }

  render() {
    const { loadScreen, userInfo: { name }, welcomeMsg } = this.state;
    const message = (
      <p data-testid="header-user-name">
        {
          `Welcome ${name}`
        }
      </p>
    );
    return (
      <header data-testid="header-component">
        {
          loadScreen
          && <Loading />
        }

        {
          welcomeMsg
          && message
        }

      </header>
    );
  }
}

export default Header;
