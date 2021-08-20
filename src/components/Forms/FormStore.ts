import { makeAutoObservable } from 'mobx';
import { enhanceFileds } from '@components/Forms/utils';
import {
  FormData,
  FormFields,
  FormSubmit,
  FormStore as FormStoreInterface,
} from '@components/interfaces';
import { FormFieldValue } from '@components/types';
import cloneDeep from 'lodash/cloneDeep';

export default class FormStore implements FormStoreInterface {
  ready: boolean = false;
  initialFields: FormFields = {};
  fields: FormFields = {};
  submit: FormSubmit = {} as FormSubmit;
  touched: boolean = false;
  sending: boolean = false;
  hub: EventTarget = new EventTarget();

  constructor() {
    makeAutoObservable(this);
  }

  setReady(value: boolean) {
    this.ready = value;
  }

  saveFields() {
    this.initialFields = cloneDeep(this.fields);
  }

  setFields(fields: FormFields): void {
    this.fields = enhanceFileds(fields);
  }

  setFieldValue(name: string, value: FormFieldValue): void {
    this.fields[name].value = value;
  }

  setFieldError(name: string, value: string | false): void {
    if (typeof this.fields[name].validation === 'undefined') {
      this.fields[name].validation = {};
    }

    this.fields[name].validation = { ...this.fields[name].validation, error: value };
  }

  setSubmit(value: FormSubmit): void {
    this.submit = value;
  }

  setTouched(value: boolean): void {
    this.touched = value;
  }

  setSending(value: boolean): void {
    this.sending = value;
  }

  resetForm(): void {
    this.setFields(cloneDeep(this.initialFields));
  }

  collectFormData(): FormData {
    return Object.entries(this.fields).reduce((acc: any, cur: any) => {
      return { ...acc, [cur[0]]: cur[1].value };
    }, {});
  }
}
