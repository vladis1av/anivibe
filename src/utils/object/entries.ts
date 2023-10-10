import { Entries } from '@interfaces/common';

const entries = <T extends {}>(obj: T): Entries<T> => Object.entries(obj) as any;

export default entries;
