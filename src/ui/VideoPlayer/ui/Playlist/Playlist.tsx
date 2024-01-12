import {
  FC, memo,
} from 'react';

import { useRouter } from 'next/router';

import Autocomplete, { AutocompleteChangeReason, AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';

import { Playlist as PlaylistType } from '@interfaces/anime';
import { QueryType, VideoPlayerEpisodeQuery } from '@interfaces/query';

import { SetSourceActionProps } from '@redux/slices/videoPlayer';

import formatSerie from '@utils/formatting/formatSerie';

import usePlaylistStyles from './Playlist.styles';

type PlaylistProps = {
  playlist: PlaylistType[];
  sourceIndex: number;
  onChangeSource: (source: SetSourceActionProps) => void;
  className?: string;
};

const Playlist: FC<PlaylistProps> = memo(
  ({
    playlist,
    sourceIndex,
    onChangeSource,
    className,
  }) => {
    const route = useRouter();
    const classes = usePlaylistStyles();
    const serie = formatSerie(sourceIndex + 1);
    const { query } = route as unknown as QueryType<VideoPlayerEpisodeQuery>;
    const options: string[] = playlist.map((option) => formatSerie(option.episode));

    const setEpisodeQuery = (episode: string) => {
      query.episode = episode;
      route.replace({ ...route }, undefined, { shallow: true, scroll: false });
    };

    const setSource = (_: any, filterValue: string | null, reason: AutocompleteChangeReason) => {
      if (reason === 'selectOption' && filterValue) {
      // filterValue === Серия 1, split and get number
        const sourceIndexValue = Number(filterValue.split(' ')[1]);
        onChangeSource({
          currentEpisode: sourceIndexValue ? sourceIndexValue - 1 : 0,
          play: true,
        });
        setEpisodeQuery(`${sourceIndexValue}`);
      }
    };

    const OptionEqualToValue = (option: string, value: string) => Boolean(option.indexOf(value))
    || Boolean(option === value);

    const getInput = (params: AutocompleteRenderInputParams) => <TextField
      {...params}
      placeholder={serie}
      variant="outlined"
      size="small"
    />;

    return (
      <div className={clsx(classes.videoPlayerPlaylist, className)}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          noOptionsText="0 Серий"
          className={className}
          value={serie}
          classes={classes}
          options={options}
          onChange={setSource}
          isOptionEqualToValue={OptionEqualToValue}
          renderInput={getInput}
        />
      </div>
    );
  },
);

export default memo(Playlist, (prevProps, nextProps) => prevProps.sourceIndex === nextProps.sourceIndex
&& prevProps.className === nextProps.className);
