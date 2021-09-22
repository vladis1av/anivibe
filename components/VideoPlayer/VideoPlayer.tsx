import React from 'react';
import styles from './VideoPlayer.module.scss';

interface VideoPlayerProps {
  alternative_player: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ alternative_player }) => {
  if (!alternative_player) {
    return null;
  }

  return (
    <div id="playerjs" className={styles.videoPlayer}>
      <iframe
        src={`${alternative_player ? alternative_player : ''}`}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ height: '700px' }}
        allowFullScreen={true}></iframe>
    </div>
  );
};

export default VideoPlayer;
