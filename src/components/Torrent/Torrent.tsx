import { FC, memo } from 'react';

import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { TorrentList } from '@interfaces/anime';

import { EFyle } from '@enums/enums';

import AppSVG from '@static/svg/app';
import CheckSVG from '@static/svg/check';
import ArrowLongSVG from '@static/svg/longArrow';
import MagnetSVG from '@static/svg/magnet';

import getDateFromUnix from '@utils/getDateFromUnix';
import getFileLink from '@utils/getFileLink';
import getFileSize from '@utils/getFileSize';

import useTorrentStyles from './Torrent.styles';

const Torrent: FC<TorrentList> = ({ list }) => {
  const classes = useTorrentStyles();

  return (
    <Paper className={classes.torrentWrapper}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Серии</TableCell>

              <TableCell align="center">Качество</TableCell>

              <TableCell align="center">Размер</TableCell>

              <TableCell align="center">Обновление</TableCell>

              <TableCell align="center" className={classes.download}>
                Скачать
              </TableCell>

              <TableCell align="center" className={classes.seeders}>
                <ArrowLongSVG className={classes.seedersSvg}/>
              </TableCell>

              <TableCell align="center">
                <ArrowLongSVG className={classes.leechersSvg}/>
              </TableCell>

              <TableCell align="center">
                <CheckSVG className={classes.downloadCompleteSvg}/>
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {list.map(({
              series,
              quality,
              torrent_id: id,
              total_size: totalSize,
              hash,
              uploaded_timestamp: uploadedTimestamp,
              seeders,
              leechers,
              downloads,
            }) => (
              <TableRow key={id}>
                <TableCell>{series.string}</TableCell>

                <TableCell align="center">{quality.string}</TableCell>

                <TableCell align="center">
                  {getFileSize(totalSize)}
                </TableCell>

                <TableCell align="center">
                  {getDateFromUnix(uploadedTimestamp)}
                </TableCell>

                <TableCell align="center">
                  <div className={classes.linkWrapper}>
                    <Link href={getFileLink(EFyle.torrent, id)}>
                      <AppSVG className={classes.downLoadSvg} />
                    </Link>

                    <Link href={`${EFyle.magnet}${hash}`} className={classes.magnet}>
                      <MagnetSVG />
                    </Link>
                  </div>

                </TableCell>

                <TableCell align="center" className={classes.seeders}>
                  {seeders}
                </TableCell>

                <TableCell align="center" className={classes.leechers}>
                  {leechers}
                </TableCell>

                <TableCell align="center" className={classes.downloadComplete}>{downloads}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default memo(Torrent);
