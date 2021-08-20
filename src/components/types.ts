import { CheckBoxFormField, FreeObject, InputFormField, SelectFormField } from './interfaces';

export type Size = 'sm' | 'md' | 'lg';
export type IconSize = Size;
export type ButtonSize = Size;
export type PreloaderSize = Size;
export type SectionColorScheme = 'default' | 'dark';
export type ButtonColorScheme = 'brand' | 'secondary' | 'transparent' | 'transparentDark';
export type LinkTarget = '_self' | '_blank';
export type ClassName = FreeObject | string;
export type InputType = 'text' | 'tel' | 'email' | 'password';
export type UsePageLocker = [() => void, () => void];
export type UseThrottle = ({ ...args }: any) => void;
export type Align = 'left' | 'right' | 'center';
export type CheckBoxLabel = string | number | bigint | JSX.Element | HTMLElement;
export type FormField = InputFormField | SelectFormField | CheckBoxFormField;
export type FormFieldValue = string | boolean | string[];
