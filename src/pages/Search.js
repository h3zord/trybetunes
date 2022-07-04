import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      checkInputLength: true,
      loadScreen: false,
      artist: '',
      showArtist: false,
      findAlbum: false,
      albumList: [],
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

  searchMusic = () => {
    const { search } = this.state;
    this.setState({ artist: search });
    this.setState({ loadScreen: true }, async () => {
      const result = await searchAlbumsAPI(search);
      this.setState({
        search: '',
        loadScreen: false,
        showArtist: true,
        checkInputLength: true,
        albumList: [...result],
      });
      if (result.length > 0) this.setState({ findAlbum: true });
      else this.setState({ findAlbum: false });
    });
  }

  render() {
    const {
      checkInputLength,
      search,
      loadScreen,
      artist,
      showArtist,
      findAlbum,
      albumList } = this.state;

    const { updateState, searchMusic } = this;

    const result = findAlbum
      ? <p>{`Resultado de álbuns de: ${artist}`}</p>
      : <p>Nenhum álbum foi encontrado</p>;

    if (loadScreen) return <Loading />;

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
          onClick={ searchMusic }
        >
          Pesquisar
        </button>

        {
          showArtist
            ? result
            : null
        }

        {
          albumList
            .map(({ artworkUrl100, collectionName, artistName, collectionId }) => (
              <div className="album-container" key={ collectionId }>
                <img src={ artworkUrl100 } alt="capa do album" />
                <p>{ `Artista: ${artistName}` }</p>
                <Link
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  { `Album: ${collectionName}` }
                </Link>
              </div>
            ))
        }

      </div>
    );
  }
}

export default Search;
