import Paper from '@material-ui/core/Paper';
import { Table } from '@material-ui/core/';
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
import { blue, green, pink } from '@material-ui/core/colors';
import fromUnixTime from 'date-fns/fromUnixTime';
import format from 'date-fns/format';

export default function TableBlock({ list }) {
  function getSize(bytes) {
    if (bytes < 1000 * 1024) {
      return `${(bytes / 1024).toFixed(2)} Кб`;
    } else if (bytes < 1000 * 1048576) {
      return `${(bytes / 1048576).toFixed(2)} Мб`;
    } else if (bytes < 1000 * 1073741824) {
      return `${(bytes / 1073741824).toFixed(2)} Гб`;
    } else {
      return `${(bytes / 1099511627776).toFixed(2)} Тб`;
    }
  }

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
                <ArrowDownwardIcon color="secondary" />
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
                <TableCell align="center">{getSize(item.total_size)}</TableCell>
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
                <TableCell align="center" style={{ color: pink[500] }}>
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
}
