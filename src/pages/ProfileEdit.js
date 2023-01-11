/* eslint-disable react/jsx-max-depth */
import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import { getUser, updateUser } from '../services/userAPI';
import profile2 from '../images/profile2.png';
import './profileEdit.css';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      inputName: '',
      inputEmail: '',
      inputDescription: '',
      inputImage: '',
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    this.setState({}, async () => {
      const userInfo = await getUser();
      this.setState({
        inputName: userInfo.name,
        inputEmail: userInfo.email,
        inputDescription: userInfo.description,
        inputImage: userInfo.image,
      });
    });
  }

  updateState = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => { this.checkLenght(); });
  }

  checkLenght = () => {
    const { inputName, inputEmail, inputDescription, inputImage } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const firstCheck = regex.test(inputEmail);
    let secondCheck = false;
    if (inputName.length > 0 && inputDescription.length > 0 && inputImage.length > 0) {
      secondCheck = true;
    }
    return firstCheck && secondCheck;
  }

  updateUserInfo = () => {
    const { inputName, inputEmail, inputDescription, inputImage } = this.state;
    const { history } = this.props;
    const obj = {
      name: inputName,
      email: inputEmail,
      image: inputImage,
      description: inputDescription,
    };
    this.setState({}, () => {
      updateUser(obj);
      this.setState({}, () => {
        history.push('/profile');
      });
    });
  }

  render() {
    const {
      inputName,
      inputEmail,
      inputDescription,
      inputImage,
    } = this.state;

    return (
      <div className="page-profile-edit">
        <Header />
        <div className="edit-content">
          <div className="title">Editar Perfil</div>
          <div className="info-profile-container">
            <div className="img-perfil">
              <img src={ inputImage || profile2 } alt="foto do usuario" />

              <input
                data-testid="edit-input-image"
                type="text"
                name="inputImage"
                placeholder="Insira um link"
                value={ inputImage }
                onChange={ this.updateState }
              />
            </div>
            <div className="edit-inputs">
              <p>Nome</p>
              <span>Fique a vontade para usar seu nome social</span>
              <input
                data-testid="edit-input-name"
                type="text"
                name="inputName"
                placeholder="Digite seu nome"
                value={ inputName }
                onChange={ this.updateState }
              />
              <p>E-mail</p>
              <span>Escolha um e-mail que consulte diariamente</span>
              <input
                data-testid="edit-input-email"
                type="email"
                name="inputEmail"
                placeholder="Digite seu email"
                value={ inputEmail }
                onChange={ this.updateState }
              />
              <p>Descrição</p>
              <textarea
                data-testid="edit-input-description"
                name="inputDescription"
                placeholder="Sobre mim"
                value={ inputDescription }
                onChange={ this.updateState }
              />
              <div className="save-button">
                <button
                  data-testid="edit-button-save"
                  type="button"
                  disabled={ !this.checkLenght() }
                  onClick={ this.updateUserInfo }
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
