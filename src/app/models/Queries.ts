export interface GridQuery {
  size: number;
  page: number;
  stored?: SortModel[];
  filters?: FilterModel[];
}

export class GridQuery implements GridQuery {
  constructor() {
    this.size = 10;
    this.page = 1;
  }
}

export interface SortModel {
  column: string;
  desc: boolean;
}

export interface FilterModel {
  column: string;
  value: string;
}
