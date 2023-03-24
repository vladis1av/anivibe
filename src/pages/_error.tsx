import { NextPageContext } from 'next';

import { COMMON_ERROR, NOT_FOUND_ERROR } from '@constants/error';

import ErrorComponent from '@ui/Error';

import MainLayout from '@layouts/MainLayout';

const Error = ({ statusCode }: { statusCode: number }) => {
  const errorText = statusCode === 404
    ? NOT_FOUND_ERROR
    : COMMON_ERROR;

  return (
    <MainLayout fullHeight>
      <ErrorComponent statusCode={statusCode} errorText={errorText} goHome />
    </MainLayout>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  // eslint-disable-next-line no-nested-ternary
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
