import React from 'react';
import { ThemeContext } from '@components/Forms/utils';
import { ClassName } from '@components/types';
import cn from 'classnames';
import * as styles from './FormGrid.module.scss';

interface FormGridProps {
  children: JSX.Element | JSX.Element[];
  theme?: string;
  className?: ClassName;
  [key: string]: any;
}

export default function FormGrid({ children, theme = '', className, ...other }: FormGridProps) {
  return (
    <form className={cn(styles.formGrid, className)} noValidate={true} {...other}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </form>
  );
}
