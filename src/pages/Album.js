import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import MusicCard from '../Components/MusicCard';
import getMusics from '../services/musicsAPI';

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
    };
  }

  componentDidMount() {
    this.findMusic();
  }

  findMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    this.setState({
      infoMusic: {
        artist: result[0].artistName,
        collection: result[0].collectionName,
        imgAlbum: result[0].artworkUrl100,
      },
      trackList: result.filter((_el, index) => index > 0),
    });
  }

  render() {
    const { infoMusic: { artist, collection, imgAlbum }, trackList } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <img src={ imgAlbum } alt="imagem do album" />
          <p data-testid="artist-name">{ artist }</p>
          <p data-testid="album-name">{ collection }</p>
        </div>
        {
          trackList.map(({ trackName, previewUrl }) => (
            <div key={ trackName }>
              <MusicCard trackName={ trackName } previewUrl={ previewUrl } />
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
