import { format, fromUnixTime } from 'date-fns';

const getDateFromUnix = (unixDate: number): string => format(fromUnixTime(unixDate), 'dd.mm.yyyy\u00A0HH:mm');

export default getDateFromUnix;
