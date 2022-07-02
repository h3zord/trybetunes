import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      loginInputValue: '',
      checkInputLength: true,
      loadScreen: false,
      redirectSearch: false,
    };
  }

  updateState = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => { this.checkInputValueLength(); });
  }

  checkInputValueLength = () => {
    const { loginInputValue } = this.state;
    const minLength = 3;
    if (loginInputValue.length >= minLength) this.setState({ checkInputLength: false });
    else this.setState({ checkInputLength: true });
  }

  buildUser = async () => {
    const { loginInputValue } = this.state;
    this.setState({ loadScreen: true }, async () => {
      const promisse = await fetch(createUser({ name: loginInputValue }));
      this.setState({ loadScreen: false, redirectSearch: true });
      console.log(promisse);
    });
  }

  render() {
    const { loginInputValue, checkInputLength, loadScreen, redirectSearch } = this.state;
    const { updateState, buildUser } = this;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              loginInputValue={ loginInputValue }
              updateState={ updateState }
              checkInputLength={ checkInputLength }
              buildUser={ buildUser }
              loadScreen={ loadScreen }
              redirectSearch={ redirectSearch }
            />) }
          />
          <Route path="/search" component={ Search } />
          <Route path="/album/" render={ (props) => <Album { ...props } /> } />
          <Route path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
