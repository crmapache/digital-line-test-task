import React from 'react';
import { Button } from '@components/UI';
import cn from 'classnames';

import * as styles from './UpdateFormModal.module.scss';

interface UpdateFormModalProps {
  close: () => void;
  children: JSX.Element;
}

export default function UpdateFormModal({ close, children }: UpdateFormModalProps) {
  return (
    <div className={cn(styles.updateFormModal)}>
      <div className={styles.header}>
        <div className={styles.title}>Edit Record</div>
        <Button icon="bx bx-x" colorScheme="transparent" size="lg" onClick={close} />
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
