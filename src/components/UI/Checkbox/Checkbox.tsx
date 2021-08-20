import React, { useEffect, useRef } from 'react';
import { useLazyEffect } from '@components/hooks';
import { CheckBoxLabel, ClassName } from '@components/types';
import { FreeObject } from '@components/interfaces';
import anime from 'animejs';
import cn from 'classnames';
import * as styles from './Checkbox.module.scss';

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  label: CheckBoxLabel;
  disabled?: boolean;
  className?: ClassName;
  errorActive?: boolean;
  attributes?: FreeObject;
}

export default function Checkbox({
  value,
  onChange,
  label,
  disabled,
  className,
  errorActive,
  attributes,
}: Props): JSX.Element {
  const checkRef = useRef<HTMLElement>(null!);

  useEffect(() => {
    checkRef.current.style.transform = `scale(${value ? 1 : 0})`;
  }, []);

  useLazyEffect(() => {
    anime.remove(checkRef.current);

    anime({
      targets: checkRef.current,
      duration: 200,
      easing: 'easeInQuad',
      opacity: value ? [0, 1] : [1, 0],
      scale: value ? [1.5, 1] : [1, 0],
    });
  }, [value]);

  const changeHandler = () => {
    if (typeof onChange === 'function' && !disabled) {
      onChange(!value);
    }
  };

  return (
    <div
      className={cn(styles.checkbox, disabled && styles.disabled)}
      onClick={changeHandler}
      {...attributes}
    >
      <div className={cn(styles.square, value && styles.active, errorActive && styles.errorActive)}>
        <i ref={checkRef} className="bx bx-check"></i>
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}
