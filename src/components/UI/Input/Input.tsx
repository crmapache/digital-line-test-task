import React, { useEffect, useState } from 'react';
import { ClassName, InputType } from '@components/types';
import { FreeObject } from '@components/interfaces';
import cn from 'classnames';
import * as styles from './Input.module.scss';

interface Props {
  value: string;
  type: InputType;
  placeholder: string;
  textarea?: boolean;
  onInput?: (e: any) => void;
  onBlur?: (e: any) => void;
  className?: ClassName;
  parentRef?: any;
  disabled?: boolean;
  errorActive?: boolean;
  attributes?: FreeObject;
}

export default function Input({
  value = '',
  type = 'text',
  placeholder,
  textarea,
  onInput,
  onBlur,
  className,
  parentRef,
  disabled,
  errorActive,
  attributes,
}: Props): JSX.Element {
  const [innerValue, setInnerValue] = useState(value);

  const onInputHandler = (e: any) => {
    if (typeof onInput === 'function') {
      onInput(e);
    }

    setInnerValue(e.target.value);
  };

  const onBlurHandler = (e: any) => {
    if (typeof onBlur === 'function') {
      onBlur(e);
    }
  };

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const Tag = textarea ? 'textarea' : 'input';

  return (
    <Tag
      ref={parentRef}
      className={cn(
        styles.input,
        textarea && styles.textarea,
        disabled && styles.disabled,
        errorActive && styles.errorActive,
        className,
      )}
      type={type}
      value={innerValue}
      placeholder={placeholder}
      onInput={onInputHandler}
      onBlur={onBlurHandler}
      disabled={disabled}
      {...attributes}
    />
  );
}
