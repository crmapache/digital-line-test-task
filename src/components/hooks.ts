import { useRef, useState, useEffect, useContext } from 'react';
import { UsePageLocker, UseThrottle } from '@components/types';
import { DropDown, ModalToggable } from '@components/interfaces';
import { ModalContext } from '@components/utils';
import anime from 'animejs';

export const usePageLocker = (): UsePageLocker => {
  const html = document?.querySelector<HTMLHtmlElement>('html')!;
  const body = document?.querySelector<HTMLBodyElement>('body')!;

  const savedScrollPosition = useRef<number>(0);

  const lock = (): void => {
    savedScrollPosition.current = html.scrollTop;

    html.style.overflow = 'hidden';
    html.style.overflowY = 'scroll';
    html.style.height = '100%';

    body.style.overflow = 'hidden';
    body.style.height = '100%';
  };

  const unlock = (): void => {
    html.style.overflow = 'auto';
    html.style.overflowY = 'auto';
    html.style.height = 'auto';

    body.style.overflow = 'auto';
    body.style.height = 'auto';

    html.scrollTop = savedScrollPosition.current;
  };

  return [lock, unlock];
};

export const useThrottle = (fn: ({ ...args }: any) => void, ms: number): UseThrottle => {
  const cooldown = useRef<boolean>(false);
  const savedArgs = useRef<any>(null);

  return function (...args: any): void {
    if (cooldown.current) {
      savedArgs.current = args;
    } else {
      cooldown.current = true;

      setTimeout(() => {
        if (savedArgs.current) {
          fn(savedArgs.current);
        }

        cooldown.current = false;
        savedArgs.current = false;
      }, ms);

      fn(args);
    }
  };
};

export const useClickOutside = (refs: any[], handler: () => void): void => {
  useEffect(() => {
    const targets = refs.map(el => el.current);

    const listener = (e: any) => {
      if (
        !targets.some(el => el?.contains && el.contains(e.target)) &&
        typeof handler === 'function'
      ) {
        handler();
      }
    };

    document.addEventListener('mouseup', listener);
    document.addEventListener('touchend', listener);
    return () => {
      document.removeEventListener('mouseup', listener);
      document.removeEventListener('touchend', listener);
    };
  }, [refs, handler]);
};

export const useDropDown = (
  headRef: any,
  dropDownRef: any,
  arrowUpRef: any,
  arrowDownRef: any,
  onClose: (() => void) | undefined,
): DropDown => {
  const animationDuration: number = 200;
  const animationElasticDuration: number = animationDuration * 3;
  const animationEasing: string = 'easeOutCubic';

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const isVisible = useRef<boolean>(false);

  useEffect(() => {
    if (dropDownRef.current) {
      dropDownRef.current.style.opacity = 0;
      dropDownRef.current.style.zIndex = -1;
      dropDownRef.current.style.transform = 'scale(0.9)';
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', setDropDownPosition);
    window.addEventListener('resize', setDropDownPosition);

    return () => {
      window.removeEventListener('scroll', setDropDownPosition);
      window.removeEventListener('resize', setDropDownPosition);
    };
  }, []);

  useLazyEffect(() => {
    if (isMenuOpen) {
      open();
    } else {
      close();

      if (typeof onClose === 'function') {
        onClose();
      }
    }
  }, [isMenuOpen]);

  useClickOutside([headRef, dropDownRef], () => setIsMenuOpen(false));

  const open = (): void => {
    isVisible.current = true;
    anime.remove([arrowUpRef.current, arrowDownRef.current, dropDownRef.current]);

    anime({
      targets: arrowDownRef.current,
      translateY: [0, 5],
      opacity: [1, 0],
      duration: animationDuration,
      easing: animationEasing,
      complete: () => {
        anime({
          targets: arrowUpRef.current,
          translateY: [5, 0],
          opacity: [0, 1],
          duration: animationDuration,
          easing: animationEasing,
        });
      },
    });

    setDropDownPosition();

    anime({
      targets: dropDownRef.current,
      opacity: 1,
      scale: { value: 1, duration: animationElasticDuration, easing: 'easeOutElastic(4, .5)' },
      duration: animationDuration,
      easing: animationEasing,
      begin: () => {
        dropDownRef.current.style.zIndex = 999;
      },
    });
  };

  const close = (): void => {
    anime.remove([arrowUpRef.current, arrowDownRef.current, dropDownRef.current]);

    anime({
      targets: arrowUpRef.current,
      translateY: [0, -5],
      opacity: [1, 0],
      duration: animationDuration,
      easing: animationEasing,
      complete: () => {
        anime({
          targets: arrowDownRef.current,
          translateY: [-5, 0],
          opacity: [0, 1],
          duration: animationDuration,
          easing: animationEasing,
        });
      },
    });

    anime({
      targets: dropDownRef.current,
      opacity: 0,
      duration: animationDuration,
      easing: animationEasing,
      scale: 0.9,
      complete: () => {
        dropDownRef.current.style.zIndex = -1;
        isVisible.current = false;
      },
    });
  };

  const setDropDownPosition = (): void => {
    if (!isVisible.current) return;

    const headCoords = headRef.current.getBoundingClientRect();

    dropDownRef.current.style.left = `${headCoords.x}px`;
    dropDownRef.current.style.top = `${headCoords.y + headCoords.height + 6}px`;
    dropDownRef.current.style.width = `${headCoords.width}px`;

    const saveTransform = dropDownRef.current.style.transform;
    dropDownRef.current.style.transform = 'scale(1)';
    const dropDownCoords = dropDownRef.current.getBoundingClientRect();

    if (dropDownCoords.y + dropDownCoords.height > window.innerHeight) {
      dropDownRef.current.style.top = `${headCoords.y - dropDownCoords.height - 6}px`;
    }

    dropDownRef.current.style.transform = saveTransform;
  };

  return {
    open: () => setIsMenuOpen(true),
    close: () => setIsMenuOpen(false),
    toggle: (): boolean => {
      setIsMenuOpen(!isMenuOpen);
      return !isMenuOpen;
    },
  };
};

export const useLazyEffect = (fn: () => void, deps: any[]): void => {
  const isRendered = useRef(false);

  useEffect(() => {
    if (isRendered.current) {
      fn();
    } else {
      isRendered.current = true;
    }
  }, deps);
};

export const useModal = (): ModalToggable => {
  const Modal = useContext(ModalContext);

  return {
    open: Modal.open,
    close: Modal.close,
  };
};
