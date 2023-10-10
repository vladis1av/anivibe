const serverlessOrEdgeApi = (
  edgeApi: string | undefined,
  serverlessApi: string | undefined,
  isEdge?: boolean,
): string => {
  if (isEdge) {
    return edgeApi || '';
  }
  return serverlessApi || '';
};

export default serverlessOrEdgeApi;
