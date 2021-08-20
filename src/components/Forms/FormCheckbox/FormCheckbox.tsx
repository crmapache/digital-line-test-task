import React from 'react';
import { Checkbox } from '@components/UI';
import { FormError } from '@components/Forms';
import { useField } from '@components/Forms/hooks';
import { observer } from 'mobx-react';
import { CheckBoxFormField, FormFieldProps } from '@components/interfaces';
import * as styles from './FormCheckbox.module.scss';

function FormCheckbox({ name }: FormFieldProps) {
  const { field, error, errorVisible, onValueChange } = useField(name);

  const checkBoxField = field as CheckBoxFormField;

  return (
    <div className={styles.formCheckbox}>
      <Checkbox
        value={field.value as boolean}
        onChange={() => onValueChange(!field.value)}
        label={checkBoxField.label}
        disabled={field.disabled}
        errorActive={Boolean(error)}
        attributes={field.attributes}
      />
      <FormError isVisible={errorVisible} text={error} />
    </div>
  );
}

export default observer(FormCheckbox);
