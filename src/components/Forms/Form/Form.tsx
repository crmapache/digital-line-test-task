import React from 'react';
import { Form as FormInterface } from '@components/interfaces';
import { FormContext } from '@components/Forms/utils';

interface FormProps {
  children: JSX.Element;
  form: FormInterface;
}

export default function Form({ children, form }: FormProps) {
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
}
