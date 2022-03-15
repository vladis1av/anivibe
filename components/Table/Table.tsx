import { FC } from 'react';
import {
  Paper,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { blue, green, pink } from '@material-ui/core/colors';
import { format, fromUnixTime } from 'date-fns';
import { TorrentList } from '@interfaces/interfaces';
import GetAppIcon from '@material-ui/icons/GetApp';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CheckIcon from '@material-ui/icons/Check';
import getFileSize from '@utils/getFileSize';

const TableBlock: FC<TorrentList> = ({ list }) => {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Серии</TableCell>

              <TableCell align="center">Качество</TableCell>

              <TableCell align="center">Размер</TableCell>

              <TableCell align="center">Обновление</TableCell>

              <TableCell align="center" style={{ color: blue[700] }}>
                Скачать
              </TableCell>

              <TableCell align="center" style={{ color: green[500] }}>
                <ArrowUpwardIcon />
              </TableCell>

              <TableCell align="center">
                <ArrowDownwardIcon style={{ color: pink[600] }} />
              </TableCell>

              <TableCell align="center">
                <CheckIcon />
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {list.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.series.string}</TableCell>

                <TableCell align="center">{item.quality.string}</TableCell>

                <TableCell align="center">
                  {getFileSize(item.total_size)}
                </TableCell>

                <TableCell align="center">{`${format(
                  fromUnixTime(item.uploaded_timestamp),
                  'dd.mm.yyyy\u00A0HH:mm',
                )}`}</TableCell>

                <TableCell align="center">
                  <Link href={`https://tv2.darklibria.it${item.url}`}>
                    <GetAppIcon style={{ color: blue[700] }} />
                  </Link>
                </TableCell>

                <TableCell align="center" style={{ color: green[500] }}>
                  {item.seeders}
                </TableCell>

                <TableCell align="center" style={{ color: pink[600] }}>
                  {item.leechers}
                </TableCell>

                <TableCell align="center">{item.downloads}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TableBlock;
