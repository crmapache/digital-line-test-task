import { makeAutoObservable } from 'mobx';
import cloneDeep from 'lodash/cloneDeep';
import { AppStore as AppStoreInterface, TableRecord } from '@components/interfaces';

class AppStore implements AppStoreInterface {
  tables: TableRecord[][] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTableRecord = (tableIndex: number, record: TableRecord): void => {
    if (tableIndex === 0 && this.tables.length < 1) {
      this.tables.push([]);
    }

    this.tables[tableIndex].push(record);
  };

  deleteTableRecord = (tableIndex: number, recordIndex: number): void => {
    this.tables[tableIndex].splice(recordIndex, 1);
  };

  updateTableRecord = (tableIndex: number, recordIndex: number, values: TableRecord): void => {
    const age = this.tables[tableIndex][recordIndex].age;
    this.tables[tableIndex][recordIndex] = { ...values, age };
  };

  cloneTable = (tableIndex: number): void => {
    this.tables.push(cloneDeep(this.tables[tableIndex]));
  };

  deleteTable = (tableIndex: number): void => {
    this.tables.splice(tableIndex, 1);
  };
}

export default new AppStore();
