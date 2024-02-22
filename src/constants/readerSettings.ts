import { EPageSwitchingArea, EReadingMode } from '@enums/enums';

import { ReaderSettingsType, ReaderSettingsTypeKey } from '@redux/slices/reader';

type ReaderSettingsTypeValues<T extends ReaderSettingsTypeKey> = {
  type: ReaderSettingsType[T];
  text: string;
};

export type ReaderSettingsTypeMock = {
  [key in ReaderSettingsTypeKey]: {
    title: string;
    values: Array<ReaderSettingsTypeValues<key>>;
  }
};

export const READER_SETTINGS: ReaderSettingsTypeMock = {
  server: {
    title: 'Сервер',
    values: [
      { type: 0, text: 'Первый' },
      { type: 1, text: 'Второй' },
    ],
  },
  readingMode: {
    title: 'Режим чтения',
    values: [
      { type: EReadingMode.horizontal, text: 'Горизонтальный' },
      { type: EReadingMode.vertical, text: 'Вертикальный' }],
  },
  pageSwitchingArea: {
    title: 'Область переключения страниц',
    values: [
      { type: EPageSwitchingArea.image, text: 'Изображение' },
      { type: EPageSwitchingArea.page, text: 'Весь экран' },
    ],
  },
  preLoadImages: {
    title: 'Предзагрузка изображения',
    values: [{ type: true, text: 'Включена' }, { type: false, text: 'Выключена' }],
  },
};
