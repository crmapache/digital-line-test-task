import { useEffect, useContext } from 'react';
import { useThrottle } from '@components/hooks';
import { isFormValid, validate, FormContext } from '@components/Forms/utils';
import { FormStore as FormStoreInterface, Form, FormFields, Field } from '@components/interfaces';
import { FormFieldValue } from '@components/types';

export function useForm(store: FormStoreInterface): Form {
  useEffect(() => {
    store.saveFields();
  }, []);

  const throttledUpdateValidation = useThrottle(() => {
    validate(store);
  }, 100);

  const onValueChange = (value: FormFieldValue, name: string): void => {
    store.setFieldValue(name, value);

    if (store.touched) {
      throttledUpdateValidation(store);
    }
  };

  const onBlur = (): void => {
    store.setTouched(true);
    validate(store);
  };

  const onSubmit = (e: any): void => {
    e.preventDefault();
    store.setTouched(true);
    validate(store);

    if (isFormValid(store.fields)) {
      store.setSending(true);

      store.submit.onSubmit(store.collectFormData()).then(() => {
        store.setTouched(false);
        store.setSending(false);

        if (store.submit.reset) {
          store.resetForm();
        }
      });
    }
  };

  return {
    store,
    onValueChange,
    onBlur,
    onSubmit,
  };
}

export function useField(name: string): Field {
  const form: Form = useContext(FormContext);
  const fields: FormFields = form.store.fields;

  const onValueChange = (value: FormFieldValue): void => {
    form.onValueChange(value, name);
  };

  return {
    field: fields[name],
    error: fields[name].validation?.error ?? false,
    errorVisible: fields[name].validation?.errorVisible ?? true,
    onValueChange,
    onBlur: form.onBlur,
  };
}
