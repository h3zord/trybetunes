import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      favorite: false,
      loadScreen: false,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite = () => {
    const { track: { trackId }, trackListFavorite } = this.props;
    const trackFind = trackListFavorite.some((obj) => obj.trackId === trackId);
    this.setState({ favorite: trackFind });
    console.log(trackListFavorite);
  }

  addFavorite = () => {
    const { favorite } = this.state;
    const { track } = this.props;
    this.setState((prevState) => ({ favorite: !prevState.favorite }), () => {
      if (!favorite) this.handleCheck(track);
    });
  }

  handleCheck = (track) => {
    this.setState({ loadScreen: true }, async () => {
      await addSong(track);
      this.setState({ loadScreen: false });
    });
  }

  render() {
    const { track: { trackName, previewUrl, trackId } } = this.props;
    const { addFavorite } = this;
    const { loadScreen, favorite } = this.state;

    if (loadScreen) return <Loading />;
    return (
      <>
        <p>{ trackName }</p>
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

        <label
          data-testid={ `checkbox-music-${trackId}` }
          htmlFor={ trackId }
        >
          Favorita
          <input
            type="checkbox"
            id={ trackId }
            onChange={ addFavorite }
            name=""
            checked={ favorite }
          />
        </label>
      </>
    );
  }
}
MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }),
  trackListFavorite: PropTypes.arrayOf(PropTypes.object).isRequired,
};

MusicCard.defaultProps = {
  track: PropTypes.shape({
    trackName: '',
    trackId: 0,
    previewUrl: '',
  }),
};

export default MusicCard;
