import React from 'react';
import { Link } from 'react-router-dom';
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
        <span>Welcome </span>
        {
          name
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

        <Link to="/search" data-testid="link-to-search"> Search </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
        <Link to="/profile" data-testid="link-to-profile"> Profile </Link>
      </header>
    );
  }
}

export default Header;
