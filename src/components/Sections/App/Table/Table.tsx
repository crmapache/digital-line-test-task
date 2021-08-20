import React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react';
import { Button } from '@components/UI';
import { TableRecord } from '@components/interfaces';

import * as styles from './Table.module.scss';

interface TableInterface {
  data: TableRecord[];
  tableIndex: number;
  copyHandler: (tableIndex: number) => void;
  deleteHandler: (tableIndex: number) => void;
  recordDeleteHandler: (tableIndex: number, i: number) => void;
  recordUpdateHandler: (tableIndex: number, i: number) => void;
  canBeDeleted: boolean;
}

function Table({
  data,
  tableIndex,
  copyHandler,
  deleteHandler,
  recordDeleteHandler,
  recordUpdateHandler,
  canBeDeleted,
}: TableInterface) {
  return (
    <div className={styles.table}>
      <div className={cn(styles.record, styles.header)}>
        <div className={styles.cell}>Name</div>
        <div className={styles.cell}>Surname</div>
        <div className={styles.cell}>Age</div>
        <div className={styles.cell}>City</div>
        <div className={cn(styles.cell, styles.double)}>
          {data.length > 0 && (
            <Button
              className={styles.button}
              size="sm"
              icon="bx bxs-copy-alt"
              onClick={() => copyHandler(tableIndex)}
              colorScheme="transparent"
            />
          )}
          {canBeDeleted && (
            <Button
              className={styles.button}
              size="sm"
              icon="bx bxs-trash"
              onClick={() => deleteHandler(tableIndex)}
              colorScheme="transparent"
            />
          )}
        </div>
      </div>
      {data.length > 0 ? (
        data.map((record: TableRecord, i: number) => {
          return (
            <div className={styles.record} key={i}>
              <div className={styles.cell}>{record.name}</div>
              <div className={styles.cell}>{record.surname}</div>
              <div className={styles.cell}>{record.age}</div>
              <div className={styles.cell}>{record.city}</div>
              <div className={cn(styles.cell, styles.double)}>
                <Button
                  className={styles.button}
                  size="sm"
                  icon="bx bxs-edit"
                  onClick={() => recordUpdateHandler(tableIndex, i)}
                  colorScheme="transparentDark"
                />
                <Button
                  className={styles.button}
                  size="sm"
                  icon="bx bxs-trash"
                  onClick={() => recordDeleteHandler(tableIndex, i)}
                  colorScheme="transparentDark"
                />
              </div>
            </div>
          );
        })
      ) : (
        <div className={styles.empty}>No records</div>
      )}
    </div>
  );
}

export default observer(Table);
