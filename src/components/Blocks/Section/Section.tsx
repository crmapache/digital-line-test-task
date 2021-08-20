import React from 'react';
import { ucfirst } from '@components/utils';
import { SectionColorScheme } from '@components/types';
import cn from 'classnames';
import * as styles from './Section.module.scss';

interface SectionProps {
  children?: JSX.Element | JSX.Element[];
  stretched?: boolean;
  colorScheme?: SectionColorScheme;
  [propName: string]: any;
}

export default function Section({
  children,
  stretched = false,
  colorScheme = 'default',
  ...rest
}: SectionProps): JSX.Element {
  return (
    <section
      className={cn(
        styles.section,
        stretched && styles.stretched,
        colorScheme && styles[`colorScheme${ucfirst(colorScheme)}`],
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
