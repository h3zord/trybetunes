import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
// import Loading from './Loading';
import './musicCard.css';
import favoriteIcon from '../images/favorite.svg';
import unFavoriteIcon from '../images/unfavorite.svg';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      loadScreen: false,
      trackListFavorite: [],
    };
  }

  componentDidMount() {
    this.getFavoriteList();
  }

  getFavoriteList = () => {
    this.setState({ loadScreen: true }, async () => {
      const result = await getFavoriteSongs();
      this.setState({ loadScreen: false, trackListFavorite: [...result] },
        () => {
          const { trackListFavorite } = this.state;
          this.getFavorite(trackListFavorite);
        });
    });
  }

  getFavorite = (trackListFavorite) => {
    const { track: { trackId } } = this.props;
    const trackFind = trackListFavorite.some((obj) => obj.trackId === trackId);
    this.setState({ favorite: trackFind });
  }

  addRemoveFavorite = () => {
    this.setState((prevState) => ({ favorite: !prevState.favorite }), () => {
      const { favorite } = this.state;
      const { track } = this.props;
      if (favorite) this.addFavorite(track);
      if (!favorite) this.removeFavorite(track);
    });
  }

  addFavorite = (track) => {
    this.setState({ loadScreen: true }, async () => {
      await addSong(track);
      const result = await getFavoriteSongs();
      this.setState({ loadScreen: false, trackListFavorite: [...result] });
      const { updateList } = this.props;
      updateList();
    });
  }

  removeFavorite = (track) => {
    this.setState({ loadScreen: true }, async () => {
      await removeSong(track);
      this.setState({ loadScreen: false, favorite: false });
      const { updateList } = this.props;
      updateList();
    });
  }

  render() {
    const { track: { trackName, previewUrl, trackId } } = this.props;
    const { addRemoveFavorite } = this;
    // eslint-disable-next-line no-unused-vars
    const { loadScreen, favorite } = this.state;

    // if (loadScreen) return <Loading />;
    return (
      <>
        <div>
          <p className="music-name">{ trackName }</p>
        </div>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          <code>
            audio
          </code>
          .
        </audio>

        {/* <label
          data-testid={ `checkbox-music-${trackId}` }
          htmlFor={ trackId }
        >
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            onChange={ addRemoveFavorite }
            checked={ favorite }
          />
        </label> */}
        <button
          type="button"
          onClick={ addRemoveFavorite }
          id={ trackId }
          className="favorite-button"
        >
          {
            favorite
              ? <img src={ favoriteIcon } alt="favorite-icon" />
              : <img src={ unFavoriteIcon } alt="unfavorite-icon" />
          }
        </button>
      </>
    );
  }
}
MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.node.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
  updateList: PropTypes.func,
};

MusicCard.defaultProps = {
  updateList: () => {},
};

export default MusicCard;
