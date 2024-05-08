import { ELocaleType } from '@interfaces/common';

import { ELocale } from '@enums/enums';

type DateOptions = Intl.DateTimeFormatOptions;

class FormatedDate {
  private static readonly ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

  private static readonly dayPointers: { [key: string]: { today: string, yesterday: string } } = {
    [ELocale.ru]: {
      today: 'Сегодня',
      yesterday: 'Вчера',
    },
    [ELocale.us]: {
      today: 'Today',
      yesterday: 'Yesterday',
    },
  };

  private static getDiffOfDays(startDate: Date, endDate: Date): number {
    const diffInTime = endDate.getTime() - startDate.getTime();
    return Math.round(diffInTime / this.ONE_DAY_IN_MILLISECONDS);
  }

  private static getFormatedDayPointer(day: number, locale: ELocaleType): string | null {
    const dayPointer = this.dayPointers[locale] || this.dayPointers[ELocale.us];
    switch (day) {
      case 0:
        return dayPointer.today;
      case 1:
        return dayPointer.yesterday;
      default:
        return null;
    }
  }

  private static getDateFromUnix = (unixDate: number): Date => {
    const unixTimestamp = unixDate;
    return new Date(unixTimestamp * 1000);
  };

  private static getIntlDateTimeFormat(
    date: Date,
    locale: ELocaleType,
    dateOptions: DateOptions,
    withCustomFormat?: boolean,
  ): string {
    const dateNow = new Date();
    const currentDate = new Intl.DateTimeFormat(locale, dateOptions).format(date);

    if (withCustomFormat) {
      const diffDay = this.getDiffOfDays(date, dateNow);
      const formatedDay = this.getFormatedDayPointer(diffDay, locale);

      if (formatedDay) {
        return formatedDay;
      }
    }

    return currentDate;
  }

  static isToday(dateOrUnixTime: Date | number): boolean {
    const date = typeof dateOrUnixTime === 'number' ? this.getDateFromUnix(dateOrUnixTime) : dateOrUnixTime;
    const today = new Date();
    return (
      date.getDate() === today.getDate()
      && date.getMonth() === today.getMonth()
      && date.getFullYear() === today.getFullYear()
    );
  }

  static getFormatedDate(
    dateOrUnixTime: Date | number,
    locale: ELocaleType,
    withCustomFormat?: boolean,
    dateOptions: DateOptions = {},
  ): string {
    const date = typeof dateOrUnixTime === 'number' ? this.getDateFromUnix(dateOrUnixTime) : dateOrUnixTime;

    switch (locale) {
      case ELocale.ru:
        return this.getIntlDateTimeFormat(date, locale, dateOptions, withCustomFormat);
      case ELocale.us:
        return this.getIntlDateTimeFormat(date, locale, dateOptions, withCustomFormat);
      default:
        return this.getIntlDateTimeFormat(date, ELocale.us, dateOptions, withCustomFormat);
    }
  }
}

export default FormatedDate;
