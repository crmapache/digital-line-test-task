import React from 'react';
import * as styles from './ScrollableFlexContainer.module.scss';

interface Props {
  children: JSX.Element;
}

export default function ScrollableFlexContainer({ children }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{children}</div>
    </div>
  );
}
