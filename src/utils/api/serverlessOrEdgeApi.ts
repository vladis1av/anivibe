import { ERuntimeValueType } from '@interfaces/common';

import isEdgeRuntime from './isEdgeRuntime';

const serverlessOrEdgeApi = (
  edgeApi: string | undefined,
  serverlessApi: string | undefined,
  runtime?: ERuntimeValueType,
) => {
  if (isEdgeRuntime(runtime)) {
    return edgeApi;
  }

  return serverlessApi;
};

export default serverlessOrEdgeApi;
