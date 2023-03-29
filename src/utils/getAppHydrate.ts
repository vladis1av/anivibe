import { createAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { AppState } from '@redux/store';

const getAppHydrate = () => createAction<AppState>(HYDRATE);

export default getAppHydrate;
