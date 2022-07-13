import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      dataUser: '',
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    this.setState({ }, async () => {
      const result = await getUser();
      this.setState({ dataUser: result });
    });
  }

  render() {
    const { dataUser: { name, email, image, description } } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        <img src={ image } alt="foto do usuario" data-testid="profile-image" />
        <p>{ name }</p>
        <p>{ email }</p>
        <p>{ description }</p>
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
