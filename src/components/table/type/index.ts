import type { RowData, TableColumn } from 'naive-ui/es/data-table/src/interface';

export interface Columns {
  title: string;
  key: string;
}

export interface Config {
  /** 配置项 */
  data: RowData[];
  columns: TableColumn<any>[];
  pagination?: NaiveUI.PaginationProps;
}

export interface Emits {
  (e: 'refresh'): void;
}
