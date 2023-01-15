import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './header.css';
import logo from '../images/logo.svg';
import search from '../images/search.svg';
import star from '../images/star.svg';
import profile from '../images/profile.svg';
import profile2 from '../images/profile2.png';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loadScreen: false,
      welcomeMsg: false,
      userInfo: {
        name: '',
        image: '',
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
        userInfo: { name: promisse.name, image: promisse.image },
      });
    });
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { loadScreen, userInfo: { name, image }, welcomeMsg } = this.state;
    const message = (
      <div className="profile-container">
        <img src={ image || profile2 } alt="icon-profile" />
        <span>{ name }</span>
      </div>
    );
    return (
      <div className="header-component">

        {/* {
          loadScreen
          && <Loading />
        } */}

        <div className="header-logo">
          <img src={ logo } alt="logo-img" />
        </div>

        <div className="header-links">
          <Link to="/search" className="links">
            <img src={ search } alt="search-img" />
          </Link>

          <Link to="/favorites" className="links">
            <img src={ star } alt="star-img" />
          </Link>
          <Link to="/profile" className="links">
            <img src={ profile } alt="profile-img" />
          </Link>
        </div>

        <div className="header-name">
          {
            loadScreen && <Loading />
          }

          {
            welcomeMsg
            && message
          }
        </div>

      </div>
    );
  }
}

export default Header;
