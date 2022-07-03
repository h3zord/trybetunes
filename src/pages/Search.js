import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      checkInputLength: true,
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
    const { search } = this.state;
    const minLength = 2;
    if (search.length >= minLength) this.setState({ checkInputLength: false });
    else this.setState({ checkInputLength: true });
  }

  render() {
    const { checkInputLength, search } = this.state;
    const { updateState } = this;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="search"
          data-testid="search-artist-input"
          placeholder="Digite aqui"
          onChange={ updateState }
          name="search"
          value={ search }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ checkInputLength }
        >
          Pesquisar
        </button>

      </div>
    );
  }
}

export default Search;
