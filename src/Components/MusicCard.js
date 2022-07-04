import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl } = this.props;
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
      </>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
};

MusicCard.defaultProps = {
  trackName: '',
  previewUrl: '',
};

export default MusicCard;
