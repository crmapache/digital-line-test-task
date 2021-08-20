import ReactDOM from 'react-dom';
import anime from 'animejs';
import { ModalToggable } from '@components/interfaces';
import * as styles from './Modal.module.scss';

class Queue {
  #queue: JSX.Element[] = [];
  #putHandler: () => void;

  constructor(putHandler: () => void) {
    this.#putHandler = putHandler;
  }

  get(): any {
    return this.#queue.shift();
  }

  put(value: any): void {
    this.#queue.push(value);
    this.#putHandler();
  }

  get length() {
    return this.#queue.length;
  }
}

class Modal implements ModalToggable {
  #root: HTMLDivElement | null = null;
  #rootId: string = 'page';
  #queue: Queue = new Queue(this.#putHandler.bind(this));

  #modal: HTMLDivElement = document.createElement('div');
  #inner: HTMLDivElement = document.createElement('div');

  #isOpen: boolean = false;
  #isAnimating: boolean = false;

  constructor() {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  #open(): void {
    anime.remove([this.#inner, this.#modal]);

    this.#isOpen = true;
    this.#isAnimating = true;

    ReactDOM.render(this.#queue.get(), this.#inner);
    this.#modal.style.zIndex = '100';

    anime({
      targets: this.#modal,
      opacity: [0, 1],
      duration: 200,
      easing: 'easeInQuad',
      complete: () => {
        anime({
          targets: this.#inner,
          opacity: { value: [0, 1], duration: 200, easing: 'easeInQuad' },
          translateY: { value: [-30, 0], duration: 500, easing: 'easeOutElastic(2, .4)' },
          complete: () => {
            this.#isAnimating = false;

            if (this.#queue.length > 0) {
              this.#close();
            }
          },
        });
      },
    });
  }

  #close(): void {
    anime.remove([this.#inner, this.#modal]);

    this.#isAnimating = true;

    anime({
      targets: this.#inner,
      opacity: [1, 0],
      translateY: [0, -30],
      easing: 'easeInQuad',
      duration: 200,
      complete: () => {
        anime({
          targets: this.#modal,
          opacity: [1, 0],
          duration: 200,
          easing: 'easeInQuad',
          complete: () => {
            this.#isAnimating = false;
            this.#modal.style.zIndex = '-1';

            if (this.#queue.length > 0) {
              this.#open();
            } else {
              ReactDOM.unmountComponentAtNode(this.#inner);
              this.#isOpen = false;
            }
          },
        });
      },
    });
  }

  #putHandler(): void {
    if (!this.#isOpen) {
      this.#open();
    } else if (this.#isOpen && !this.#isAnimating) {
      this.#close();
    }
  }

  open(content: JSX.Element): void {
    if (!this.#root) {
      this.#root = document.querySelector(`#${this.#rootId}`);
      if (!this.#root) throw new ReferenceError('Root is not defined');

      this.#modal.classList.add(styles.modal);
      this.#modal.addEventListener('mousedown', this.#close.bind(this));

      this.#inner.classList.add(styles.inner);
      this.#inner.addEventListener('mousedown', (e: any) => e.stopPropagation());

      this.#modal.append(this.#inner);

      this.#root.append(this.#modal);
    }

    this.#queue.put(content);
  }

  close(): void {
    this.#close();
  }
}

export default new Modal();
