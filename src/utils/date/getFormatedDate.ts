import { ELocaleType } from '@interfaces/common';

import { ELocale } from '@enums/enums';

type FormatedDateProps = {
  date: Date,
  locale?: ELocaleType,
  withCustomFormat?: boolean,
  dateOptions?: DateOptions
};

type DateOptions = Intl.DateTimeFormatOptions;

type DayPointer = {
  today: string;
  yesterday: string;
};

type DayPointers = {
  [key in ELocaleType]: DayPointer
};

const DAY_POINTERS: DayPointers = {
  ru: {
    today: 'Сегодня',
    yesterday: 'Вчера',
  },
  [ELocale.us]: {
    today: 'Today',
    yesterday: 'Yesterday',
  },
};

const DEFAULT_DATE_OPTIONS: DateOptions = {
  day: 'numeric', // 2-digit
  month: '2-digit', // numeric "2-digit", "narrow", "short" и "long"
  year: 'numeric', // 2-digit
  // era: "long",
  // weekday: 'short', // "narrow", "short" и "long"
  // timeZoneName: 'short',
  // hour: 'numeric',
  // hour12: true,
  // minute: 'numeric',
  // second: 'numeric'
};

const ONE_DAY_IN_MILLISECODS = 1000 * 60 * 60 * 24;

const getDayPointers = (locale: ELocaleType): DayPointer => {
  if (DAY_POINTERS[locale]) {
    return DAY_POINTERS[locale];
  }

  return DAY_POINTERS[ELocale.us];
};

function getDiffOfDays(startDate: Date, endDate: Date): number {
  // Calculating the time difference between two dates
  const diffInTime = endDate.getTime() - startDate.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / ONE_DAY_IN_MILLISECODS);

  return diffInDays;
}

const getFormatedDayPointer = (day: number, locale: ELocaleType): string | null => {
  switch (day) {
    case 0:
      return getDayPointers(locale).today;
    case 1:
      return getDayPointers(locale).yesterday;

    default:
      return null;
  }
};

const getIntlDateTimeFormat = (
  date: Date,
  locale: ELocaleType,
  dateOptions: DateOptions,
  withCustomFormat?: boolean,
): string => {
  const dateNow = new Date();
  const currentDate = new Intl.DateTimeFormat(locale, dateOptions).format(date);

  if (withCustomFormat) {
    const diffDay = getDiffOfDays(date, dateNow);
    const formatedDay = getFormatedDayPointer(diffDay, locale);

    if (formatedDay) {
      return formatedDay;
    }

    return currentDate;
  }

  return currentDate;
};

const getFormatedDate = (
  {
    date,
    locale,
    withCustomFormat,
    dateOptions = {},
  }: FormatedDateProps,
): string => {
  const currentDateOptions: DateOptions = { ...DEFAULT_DATE_OPTIONS, ...dateOptions };
  switch (locale) {
    case ELocale.ru:
      return getIntlDateTimeFormat(date, locale, currentDateOptions, withCustomFormat);
    case ELocale.us:
      return getIntlDateTimeFormat(date, locale, currentDateOptions, withCustomFormat);
    default:
      return getIntlDateTimeFormat(date, ELocale.us, currentDateOptions, withCustomFormat);
  }
};

export default getFormatedDate;
