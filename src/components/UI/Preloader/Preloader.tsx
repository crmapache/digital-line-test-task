import React from 'react';
import { ucfirst } from '@components/utils';
import { PreloaderSize } from '@components/types';
import cn from 'classnames';
import * as styles from './Preloader.module.scss';

interface Props {
  size?: PreloaderSize;
}

export default function Preloader({ size = 'md' }: Props): JSX.Element {
  const Dots = (): JSX.Element => {
    const elements: JSX.Element[] = [];

    for (let i = 0; i < 10; i++) {
      elements.push(<div className={styles.dot} key={i}></div>);
    }

    return <>{elements}</>;
  };

  return (
    <div className={cn(styles.preloader, styles[`size${ucfirst(size)}`])}>
      <Dots />
    </div>
  );
}
