import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../Components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      infoMusic: {
        artist: '',
        collection: '',
        imgAlbum: '',
      },
      trackList: [],
      trackListFavorite: [],
      loadScreen: false,
    };
  }

  componentDidMount() {
    this.findMusic();
    this.getFavoriteList();
  }

  findMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    // console.log(result);
    this.setState({
      infoMusic: {
        artist: result[0].artistName,
        collection: result[0].collectionName,
        imgAlbum: result[0].artworkUrl100,
      },
      trackList: result.filter((_element, index) => index > 0),
    });
  }

  getFavoriteList = () => {
    this.setState({ loadScreen: true }, async () => {
      const result = await getFavoriteSongs();
      this.setState({ loadScreen: false, trackListFavorite: [...result] });
    });
  }

  render() {
    const {
      infoMusic: { artist, collection, imgAlbum },
      trackList,
      loadScreen,
      trackListFavorite,
    } = this.state;

    if (loadScreen) return <Loading />;

    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <img src={ imgAlbum } alt="imagem do album" />
          <p data-testid="artist-name">{ artist }</p>
          <p data-testid="album-name">{ collection }</p>
        </div>
        {
          trackList.map((obj) => (
            <div key={ obj.trackId }>
              <MusicCard
                track={ obj }
                trackListFavorite={ trackListFavorite }
              />
            </div>
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

Album.defaultProps = {
  match: {
    params: {
      id: '',
    },
  },
};

export default Album;
