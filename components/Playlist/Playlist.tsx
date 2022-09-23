import { FC } from 'react';

import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import { Playlist as PlaylistType } from '@interfaces/anime';

import usePlaylistStyles from './Playlist.styles';

export type PlaylistProps = {
  playlist: PlaylistType[];
  currentSourceIndex: number,
  setSource: (playlistItem: PlaylistType, sourceIndex: number)=> void;
};

const Playlist: FC<PlaylistProps> = ({
  playlist,
  setSource,
  currentSourceIndex,
}) => {
  const classes = usePlaylistStyles();

  if (!playlist.length) {
    return null;
  }

  return (
    <div className={classes.videoPlaylistWrapper}>
      <div className={classes.videoPlaylist}>
        {
          playlist.map((playlistItem, i) => (
              <div key={playlistItem.serie}>
            <Typography
              align="center"
              component="span"
              onClick={() => setSource(playlistItem, i)
              }
              className={clsx(classes.videoPlayListItem, {
                [classes.videoPlayListItemActive]: currentSourceIndex === i,
              })}
            >
              {`Серия ${i + 1}`}
            </Typography>
          </div>
          ))
        }
      </div>
    </div>
  );
};

export default Playlist;
