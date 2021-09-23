import { IHomeItems } from './homeItems';

export interface ISearchItem extends IHomeItems {
  genres: string[];
  type: {
    full_string: string;
  };
}
