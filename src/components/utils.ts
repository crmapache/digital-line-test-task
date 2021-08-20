import { createContext } from 'react';
import anime from 'animejs';
import { ModalToggable } from '@components/interfaces';

export function ucfirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function scroller(n: number, duration = 600, offset = 700) {
  return new Promise<void>((resolve, reject) => {
    const html: HTMLHtmlElement | null = document.querySelector('html');

    if (html) {
      const max: number = html.scrollHeight - window.innerHeight;
      const target: number = n > max ? max : n;

      if (Math.round(target) === Math.round(html.scrollTop)) {
        html.scrollTop = target;
        resolve();
      } else if (Math.abs(window.pageYOffset - target) > offset) {
        if (window.pageYOffset > target) {
          html.scrollTop = target + offset;
        } else {
          html.scrollTop = target - offset;
        }

        anime({
          targets: html,
          scrollTop: target,
          duration,
          easing: 'easeOutQuart',
          complete: () => {
            resolve();
          },
        });
      } else {
        anime({
          targets: html,
          scrollTop: target,
          duration,
          easing: 'easeInOutQuart',
          complete: () => {
            resolve();
          },
        });
      }
    }
  });
}

export const ModalContext = createContext<ModalToggable>({} as ModalToggable);
