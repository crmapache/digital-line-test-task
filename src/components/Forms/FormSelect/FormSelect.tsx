import React from 'react';
import { Select } from '@components/UI';
import { FormError } from '@components/Forms';
import { useField } from '@components/Forms/hooks';
import { observer } from 'mobx-react';
import { FormFieldProps, SelectFormField } from '@components/interfaces';
import * as styles from './FormSelect.module.scss';

function FormSelect({ name }: FormFieldProps) {
  const { field, error, errorVisible, onValueChange, onBlur } = useField(name);

  const selectField = field as SelectFormField;

  const onChangeHandler = (value: any) => {
    onValueChange(value);
  };

  const onMenuClose = () => {
    if (typeof selectField.onMenuClose === 'function') {
      selectField.onMenuClose();
    }

    onBlur();
  };

  return (
    <div className={styles.formSelect}>
      <Select
        value={selectField.value}
        disabled={selectField.disabled}
        onChange={onChangeHandler}
        options={selectField.options}
        multiple={selectField.multiple}
        placeholder={selectField.placeholder}
        notEmpty={selectField.notEmpty}
        onMenuClose={onMenuClose}
        errorActive={Boolean(error)}
        attributes={selectField.attributes}
      />
      <FormError isVisible={errorVisible} text={error} />
    </div>
  );
}

export default observer(FormSelect);
