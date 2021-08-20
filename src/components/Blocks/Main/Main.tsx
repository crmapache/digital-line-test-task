import React from 'react';
import * as styles from './Main.module.scss';

interface MainProps {
  children?: JSX.Element;
}

export default function Main({ children }: MainProps): JSX.Element {
  return <main className={styles.main}>{children}</main>;
}
