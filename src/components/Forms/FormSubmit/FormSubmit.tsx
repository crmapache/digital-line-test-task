import React, { useContext } from 'react';
import { Button } from '@components/UI';
import { FormContext } from '@components/Forms/utils';
import { ucfirst } from '@components/utils';
import { observer } from 'mobx-react';
import { Align } from '@components/types';
import cn from 'classnames';
import * as styles from './FormSubmit.module.scss';

interface FormSubmitProps {
  title?: string;
  align?: Align;
}

function FormSubmit({ title = 'Send', align = 'right' }: FormSubmitProps) {
  const form = useContext(FormContext);

  const onClick = (e: any): void => {
    form.onSubmit(e);
    form.store.hub.dispatchEvent(new CustomEvent('shakeError'));
  };

  return (
    <div className={cn(styles.formSubmit, styles[`align${ucfirst(align)}`])}>
      <Button
        className={styles.button}
        title={title}
        onClick={onClick}
        mobileFullWidth={true}
        loading={form.store.sending}
      />
    </div>
  );
}

export default observer(FormSubmit);
