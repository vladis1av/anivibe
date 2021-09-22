import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Link from '@material-ui/core/Link';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import GetAppIcon from '@material-ui/icons/GetApp';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CheckIcon from '@material-ui/icons/Check';
import { Table } from '@material-ui/core/';
import { blue, green, pink } from '@material-ui/core/colors';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';

import { ITorrents } from '../../interfaces/torrents';
import getFileSize from '../../utils/getFileSize';

const TableBlock: React.FC<ITorrents> = ({ list }) => {
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
