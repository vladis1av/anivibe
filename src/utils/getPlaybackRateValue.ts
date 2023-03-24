const getPlaybackRateValue = (playbackRate: number) => (playbackRate === 1 ? 'Обычная' : `${playbackRate}x`);

export default getPlaybackRateValue;
