type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][];

const entries = <T>(obj: T): Entries<T> => Object.entries(obj) as any;

export default entries;
