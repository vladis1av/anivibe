import { LegacyRef } from 'react';

import ReactPlayer, { ReactPlayerProps } from 'react-player/lazy';

const ReactPlayerWrapper = (
  props: ReactPlayerProps & {
    playerref: LegacyRef<ReactPlayer>
  },
) => <ReactPlayer ref={props.playerref} {...props} />;

export default ReactPlayerWrapper;
