import React from 'react';
import cn from 'classnames';
import * as styles from './FormGrid.module.scss';

interface FormRowProps {
  children: JSX.Element | JSX.Element[];
  sizes?: string[];
}

export default function FormRow({ sizes = [], children }: FormRowProps) {
  return (
    <div
      className={cn(
        styles.row,
        sizes.map(el => styles[el]),
      )}
    >
      {children}
    </div>
  );
}
