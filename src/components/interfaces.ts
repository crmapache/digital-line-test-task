import { CheckBoxLabel, ClassName, FormField, FormFieldValue, InputType } from '@components/types';

export interface FreeObject {
  [key: string]: any;
}

export interface SeoData {
  title: string;
  description: string;
  keywords: string[];
}

export interface DropDown {
  open: () => void;
  close: () => void;
  toggle: () => boolean;
}

export interface ModalToggable {
  open: (content: JSX.Element) => void;
  close: () => void;
}

export interface FormFieldProps {
  name: string;
}

export interface ValidationRule {
  name: string;
  payload?: any;
  error?: string;
}

export interface Validation {
  rules?: (ValidationRule | ValidationRule[])[];
  error?: string | false;
  errorVisible?: boolean;
}

export interface InputFormField {
  value: string;
  placeholder: string;
  type: InputType;
  name?: string;
  attributes?: FreeObject;
  validation?: Validation;
  disabled?: boolean;
  onInput?: (e: any) => void;
  className?: ClassName;
  textarea?: boolean;
}

export interface SelectFormField {
  value: string | string[];
  placeholder: string;
  options: string[];
  name?: string;
  attributes?: FreeObject;
  validation?: Validation;
  notEmpty?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  className?: ClassName;
  onMenuClose?: () => void;
}

export interface CheckBoxFormField {
  value: boolean;
  label: CheckBoxLabel;
  name?: string;
  attributes?: FreeObject;
  validation?: Validation;
  disabled?: boolean;
  className?: ClassName;
}

export interface FormFields {
  [key: string]: FormField;
}

export interface FormSubmit {
  onSubmit: (values: FormData) => Promise<void>;
  reset?: boolean;
}

export interface FormData {
  [key: string]: FormFieldValue;
}

export interface FormStore {
  ready: boolean;
  initialFields: FormFields;
  fields: FormFields;
  submit: FormSubmit;
  touched: boolean;
  sending: boolean;
  hub: EventTarget;
  setReady: (value: boolean) => void;
  saveFields: () => void;
  setFields: (fields: FormFields) => void;
  setFieldValue: (name: string, value: FormFieldValue) => void;
  setFieldError: (name: string, value: string | false) => void;
  setSubmit: (value: FormSubmit) => void;
  setTouched: (value: boolean) => void;
  setSending: (value: boolean) => void;
  resetForm: () => void;
  collectFormData: () => FormData;
}

export interface Form {
  store: FormStore;
  onValueChange: (value: FormFieldValue, name: string) => void;
  onBlur: () => void;
  onSubmit: (e: any) => void;
}

export interface Field {
  field: FormField;
  error: string | false;
  errorVisible: boolean;
  onValueChange: (value: FormFieldValue) => void;
  onBlur: () => void;
}

export interface TableRecord {
  name: string;
  surname: string;
  age?: number;
  city: string;
}

export interface AppStore {
  tables: TableRecord[][];
  addTableRecord: (tableIndex: number, record: TableRecord) => void;
  deleteTableRecord: (tableIndex: number, recordIndex: number) => void;
  updateTableRecord: (tableIndex: number, recordIndex: number, values: TableRecord) => void;
  cloneTable: (tableIndex: number) => void;
  deleteTable: (tableIndex: number) => void;
}
