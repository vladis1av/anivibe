import { FC } from 'react';

import Typography from '@mui/material/Typography';

import { ELinkPath } from '@enums/enums';

import Link from '@ui/Link';

import useErrorStyles from './Error.styles';

type ErrorProps = {
  statusCode?: number;
  errorText: string;
  goHome?: boolean;
};

const Error: FC<ErrorProps> = ({ statusCode, errorText, goHome }) => {
  const classes = useErrorStyles();

  return (
    <div className={classes.errorContainer}>
      {errorText && (
        <Typography className={classes.errorTitle} align="center" variant="h5">
          {errorText}
        </Typography>
      )}

      { statusCode && <Typography className={classes.statusCodeText} align="center" variant="h6">
        {statusCode && `Ошибка ${statusCode}`}
      </Typography>
      }

      {
        goHome ? <Link path={ELinkPath.home} className={classes.link}>Вернуться на главную?</Link> : <></>
      }
    </div>
  );
};

export default Error;
