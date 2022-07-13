import React from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

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
    const { loadScreen, trackListFavorite } = this.state;
    if (loadScreen) return <Loading />;

    return (
      <div data-testid="page-favorites">
        <Header />
        {
          trackListFavorite.map((obj) => (
            <div key={ obj.trackId }>
              <MusicCard
                track={ obj }
                updateList={ this.updateList }
              />
            </div>
          ))
        }
      </div>
    );
  }
}

export default Favorites;
