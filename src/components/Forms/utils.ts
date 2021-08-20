import { createContext } from 'react';
import { Form, FormFields, FormStore } from '@components/interfaces';
import validationRules from '@components/Forms/validationRules';

export const enhanceFileds = (fields: FormFields): FormFields => {
  for (const fieldKey in fields) {
    fields[fieldKey].name = fieldKey;
  }

  return fields;
};

export const isFormValid = (fields: FormFields): boolean => {
  for (const key in fields) {
    if (typeof fields[key].validation?.error === 'string') {
      return false;
    }
  }

  return true;
};

export const validate = (store: FormStore): void => {
  const fields = store.fields;

  loop: for (const key in fields) {
    const rules = fields[key].validation?.rules;

    if (rules && rules.length > 0) {
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        let passed: boolean = false;
        let error: string | false = false;

        /**
         * If is array here - i will know that here is "OR"
         * condition between rules here and for success validation i need get valid
         * at least one of them.
         */
        if (Array.isArray(rule)) {
          for (let j = 0; j < rule.length; j++) {
            error = validationRules[rule[j].name]({
              value: fields[key].value,
              payload: rule[j].payload,
              error: rule[j].error,
            });

            if (typeof error !== 'string') {
              passed = true;
            }
          }
        } else {
          error = validationRules[rule.name]({
            value: fields[key].value,
            payload: rule.payload,
            error: rule.error,
          });

          if (typeof error !== 'string') {
            passed = true;
          }
        }

        if (passed) {
          store.setFieldError(key, false);
        } else {
          store.setFieldError(key, error);
          continue loop;
        }
      }
    }
  }
};

export const FormContext = createContext<Form>({} as Form);
export const ThemeContext = createContext<string>('');
