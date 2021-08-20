import React, { useContext, useEffect, useState, useRef } from 'react';
import anime from 'animejs';
import { FormContext } from '@components/Forms/utils';
import { observer } from 'mobx-react';
import * as styles from './FormError.module.scss';

interface FormErrorProps {
  isVisible: boolean;
  text: string | false;
}

function FormError({ isVisible, text }: FormErrorProps) {
  const errorRef = useRef<HTMLDivElement>(null!);
  const [value, setValue] = useState<string | false>(false);

  const form = useContext(FormContext);

  useEffect(() => {
    errorRef.current.style.opacity = '0';
    errorRef.current.style.transform = 'translateX(10px)';
  }, []);

  useEffect(() => {
    if (text && isVisible && !value) {
      setValue(text);
      show();
    }

    if (text && isVisible && text !== value) {
      hide().then(() => {
        setValue(text);
        show();
      });
    }

    if (!text) {
      hide().then(() => {
        setValue(text);
      });
    }
  }, [text, isVisible, value]);

  useEffect(() => {
    form.store.hub.addEventListener('shakeError', shake);

    return () => {
      form.store.hub.removeEventListener('shakeError', shake);
    };
  }, [form, value]);

  const show = () => {
    anime.remove(errorRef.current);

    anime({
      targets: errorRef.current,
      translateX: 0,
      opacity: 1,
      duration: 200,
      easing: 'easeOutQuad',
    });
  };

  const hide = () => {
    return new Promise<void>(resolve => {
      anime.remove(errorRef.current);

      anime({
        targets: errorRef.current,
        translateX: 10,
        opacity: 0,
        duration: 200,
        easing: 'easeOutQuad',
        complete: anim => {
          if (typeof resolve === 'function') {
            resolve();
          }
        },
      });
    });
  };

  const shake = () => {
    if (value) {
      anime.remove(errorRef.current);

      anime({
        targets: errorRef.current,
        translateX: [{ value: 6 }, { value: -4 }, { value: 2 }, { value: -1 }, { value: 0 }],
        opacity: { value: 1, duration: 0 },
        duration: 300,
        easing: 'easeOutQuad',
      });
    }
  };

  return (
    <div className={styles.formError} ref={errorRef}>
      <div className={styles.title}>{value}</div>
    </div>
  );
}

export default observer(FormError);
