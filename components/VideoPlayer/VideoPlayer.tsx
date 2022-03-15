import React from 'react';
import styles from './VideoPlayer.module.scss';

interface VideoPlayerProps {
  alternativePlayer: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ alternativePlayer }) => {
  if (!alternativePlayer) {
    return null;
  }

  return (
    <div id="playerjs" className={styles.videoPlayer}>
      <iframe
        src={`${alternativePlayer ? alternativePlayer : ''}`}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ height: '700px' }}
        allowFullScreen={true}></iframe>
    </div>
  );
};

export default VideoPlayer;
