import { ERuntimeValueType } from '@interfaces/common';

import getProcessEnv from '@utils/config/getProcessEnv';

const getRuntime = () => {
  const { RUNTIME } = getProcessEnv();
  return RUNTIME as ERuntimeValueType;
};

export default getRuntime;
