import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDropDown } from '@components/hooks';
import { FreeObject } from '@components/interfaces';
import { ClassName } from '@components/types';
import cn from 'classnames';
import * as styles from './Select.module.scss';

interface Props {
  value: string | string[];
  options: string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  notEmpty?: boolean;
  disabled?: boolean;
  onClickHead?: () => void;
  onMenuClose?: () => void;
  className?: ClassName;
  errorActive?: boolean;
  attributes?: FreeObject;
}

export default function Select({
  value,
  options,
  onChange,
  multiple,
  placeholder = 'Choose value',
  notEmpty = true,
  disabled,
  onClickHead,
  onMenuClose,
  className,
  errorActive,
  attributes,
}: Props): JSX.Element {
  const arrowUpRef = useRef<HTMLElement>(null!);
  const arrowDownRef = useRef<HTMLElement>(null!);
  const headRef = useRef<HTMLDivElement>(null!);
  const menuRef = useRef<HTMLDivElement>(null!);

  const [innerValue, setInnerValue] = useState<string[]>([]);

  const { close, toggle } = useDropDown(headRef, menuRef, arrowUpRef, arrowDownRef, onMenuClose);

  useEffect(() => {
    if (multiple && !Array.isArray(value)) {
      throw new TypeError('Value of multiple select component must be array.');
    }

    if (notEmpty && value.length < 1) {
      throw new Error('You cannot set an empty value with "notEmpty" flag in Select component.');
    }

    if (!Array.isArray(value)) {
      setInnerValue([value]);
    } else {
      setInnerValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (disabled) {
      close();
    }
  }, [disabled]);

  const onClickHeadHandler = (): void => {
    if (disabled) return;

    if (typeof onClickHead === 'function') {
      onClickHead();
    }

    if (toggle()) {
      scrollToActiveValue();
    }
  };

  const onClickOption = (option: string): void => {
    if (multiple) {
      if (
        (innerValue.includes(option) && innerValue.length > 1) ||
        (innerValue.includes(option) && !notEmpty)
      ) {
        innerValue.splice(innerValue.indexOf(option), 1);
      } else if (!innerValue.includes(option)) {
        innerValue.push(option);
      }

      onChange(innerValue.slice());
    } else {
      if (innerValue.includes(option) && !notEmpty) {
        onChange([]);
      } else {
        onChange([option]);
      }

      setTimeout(() => {
        close();
      }, 220);
    }
  };

  const scrollToActiveValue = (): void => {
    let firstActiveOption: HTMLElement;
    let isActiveOptionVisible: boolean = false;

    if (menuRef.current) {
      Array.from(menuRef.current.children).forEach((el: Element) => {
        if (el instanceof HTMLElement && menuRef.current) {
          const top = menuRef.current.scrollTop;
          const bottom = top + menuRef.current.offsetHeight;

          if (!firstActiveOption && el.getAttribute('data-active') === 'true') {
            firstActiveOption = el;
          }

          if (
            el.getAttribute('data-active') === 'true' &&
            el.offsetTop > top &&
            el.offsetTop + el.offsetHeight < bottom
          ) {
            isActiveOptionVisible = true;
          }

          if (!isActiveOptionVisible && firstActiveOption) {
            menuRef.current.scrollTop = firstActiveOption.offsetTop - 5;
          }
        }
      });
    }
  };

  return (
    <>
      <div
        className={cn(
          styles.select,
          className,
          disabled && styles.disabled,
          errorActive && styles.errorActive,
        )}
        {...attributes}
      >
        <div
          className={styles.head}
          onClick={onClickHeadHandler}
          ref={headRef}
          data-testid="head-test-id"
        >
          <div className={styles.valueWrap}>
            <div className={styles.value} data-testid="value-test-id">
              {innerValue.length > 0 ? (
                innerValue.join(', ')
              ) : (
                <div className={styles.placeholder}>{placeholder}</div>
              )}
            </div>
          </div>
          <div className={styles.arrowWrap}>
            <i className="bx bx-chevron-up" ref={arrowUpRef}></i>
            <i className="bx bx-chevron-down" ref={arrowDownRef}></i>
          </div>
        </div>
        {ReactDOM.createPortal(
          <div className={styles.options} ref={menuRef} data-testid="options-test-id">
            {options.map((option, i) => (
              <div
                className={cn(styles.option, innerValue.includes(option) && styles.active)}
                key={i}
                onClick={() => onClickOption(option)}
                data-active={innerValue.includes(option)}
              >
                {option}
              </div>
            ))}
          </div>,
          document.querySelector('#page') as Element,
        )}
      </div>
    </>
  );
}
