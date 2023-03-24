export interface Pagenation<T> {
  data: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

export interface SelectOptions {
  text: string;
  value: string | number;
}
