export interface Pagenation<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
}
