/* eslint-disable react/jsx-max-depth */
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import profile2 from '../images/profile2.png';
import './profile.css';

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
      <div className="page-profile">
        <Header />
        <div className="profile-content">
          <div className="title">Perfil</div>
          <div className="profile-info">
            <div className="img-perfil">
              <img src={ image || profile2 } alt="foto do usuario" />
            </div>
            <div className="info-perfil">
              <div className="name-content">
                <p className="nome">Nome</p>
                <p>{ name }</p>
              </div>
              <div className="email-content">
                <p className="email">E-mail</p>
                <p>{ email }</p>
              </div>
              <div className="description-content">
                <p className="description">Descrição</p>
                <p>{ description }</p>
              </div>
              <Link to="/profile/edit" className="edit-button">Editar Perfil</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
