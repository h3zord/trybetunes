import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
// import Loading from '../Components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './search.css';
import lupa from '../images/lupa.svg';
import error from '../images/error.svg';

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
      // eslint-disable-next-line no-unused-vars
      loadScreen,
      artist,
      showArtist,
      findAlbum,
      albumList } = this.state;

    const { updateState, searchMusic } = this;

    const result = findAlbum
      ? <div className="result-msg"><p>{`Resultado de álbuns de: ${artist}`}</p></div>
      : (
        <div className="error-msg">
          <img src={ error } alt="error-img" />
          <p>Nenhum álbum foi encontrado</p>
        </div>);

    // if (loadScreen) return <Loading />;

    return (
      <div className="page-search">

        <Header />
        <div className="main-container">
          <div className="search-container">
            <input
              type="search"
              data-testid="search-artist-input"
              placeholder="DIGITE A SUA PESQUISA"
              onChange={ updateState }
              name="search"
              value={ search }
            />
            <img src={ lupa } alt="lupa-img" />
            <button
              data-testid="search-artist-button"
              type="button"
              disabled={ checkInputLength }
              onClick={ searchMusic }
            >
              PROCURAR
            </button>
          </div>
          <div className="music-container">
            {
              showArtist
                ? result
                : null
            }

            <div className="music-content">
              {
                albumList
                  .map(({ artworkUrl100, collectionName, artistName, collectionId }) => (
                    <div className="album-container" key={ collectionId }>
                      <Link
                        to={ `/album/${collectionId}` }
                        data-testid={ `link-to-album-${collectionId}` }
                      >
                        <img src={ artworkUrl100 } alt="capa do album" />
                      </Link>
                      { `Album: ${collectionName}` }
                      <p>{ `Artista: ${artistName}` }</p>
                    </div>
                  ))
              }
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Search;
