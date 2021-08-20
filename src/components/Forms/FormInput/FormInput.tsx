import React from 'react';
import { Input } from '@components/UI';
import { FormError } from '@components/Forms';
import { useField } from '@components/Forms/hooks';
import { observer } from 'mobx-react';
import { FormFieldProps, InputFormField } from '@components/interfaces';
import * as styles from './FormInput.module.scss';

function FormInput({ name }: FormFieldProps) {
  const { field, error, errorVisible, onValueChange, onBlur } = useField(name);

  const inputField = field as InputFormField;

  const onInputHandler = (e: any) => {
    if (typeof inputField.onInput === 'function') {
      inputField.onInput(e);
    }

    onValueChange(e.target.value);
  };

  return (
    <div className={styles.formInput}>
      <Input
        className={inputField.className}
        value={inputField.value}
        type={inputField.type}
        placeholder={inputField.placeholder}
        textarea={inputField.textarea}
        onInput={onInputHandler}
        onBlur={onBlur}
        disabled={field.disabled}
        errorActive={Boolean(error)}
        attributes={field.attributes}
      />
      <FormError isVisible={errorVisible} text={error} />
    </div>
  );
}

export default observer(FormInput);
