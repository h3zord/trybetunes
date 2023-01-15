import React from 'react';
import Header from '../Components/Header';
// import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import './favorites.css';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      loadScreen: false,
      trackListFavorite: [],
    };
  }

  componentDidMount() {
    this.getFavoriteList();
  }

  updateList = () => {
    this.getFavoriteList();
  }

  getFavoriteList = () => {
    this.setState({ loadScreen: true }, async () => {
      const result = await getFavoriteSongs();
      this.setState({ loadScreen: false, trackListFavorite: [...result] });
    });
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { loadScreen, trackListFavorite } = this.state;
    // if (loadScreen) return <Loading />;

    return (
      <div className="page-favorites">
        <Header />
        <div className="favorite-container">
          <div className="title">Músicas Favoritas</div>
          <div className="favorite-musics">
            {
              trackListFavorite.map((obj) => (
                <div key={ obj.trackId } className="music2">
                  <MusicCard
                    track={ obj }
                    updateList={ this.updateList }
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
