const formatPlaybackRate = (playbackRate: number) => (playbackRate === 1 ? 'Обычная' : `${playbackRate}x`);

export default formatPlaybackRate;
