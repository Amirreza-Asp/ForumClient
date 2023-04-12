export interface Log {
  id: string;
  timestamp: Date;
  level: string;
  utcTimestamp: string;
  messageTemplate: string;
  renderedMessage: string;
  properties?: any;
  exception?: string;
}

export interface LogPagenationQuery {
  page: number;
  size: number;
  level?: string;
  createdFrom?: Date;
  createdTo?: Date;
  contains?: string;
}

export interface LogFilters {
  level?: string;
  createdFrom?: Date;
  createdTo?: Date;
  contains?: string;
}
