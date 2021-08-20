import React from 'react';
import cn from 'classnames';

import * as styles from './FormGrid.module.scss';

interface FormColumnProps {
  children: JSX.Element;
  sizes?: string[];
}

export default function FormColumn({ sizes = [], children }: FormColumnProps) {
  return (
    <div
      className={cn(
        styles.column,
        sizes.map(el => styles[el]),
      )}
    >
      {children}
    </div>
  );
}
