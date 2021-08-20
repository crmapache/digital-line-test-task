import React, { MouseEventHandler, useMemo } from 'react';
import { scroller } from '@components/utils';
import { Link as GatsbyLink } from 'gatsby';
import { ClassName, LinkTarget } from '@components/types';
import cn from 'classnames';
import * as styles from './Link.module.scss';

interface Props {
  href: string;
  className?: ClassName;
  onClick?: (e: MouseEventHandler) => void;
  children?: JSX.Element;
  target?: LinkTarget;
  inline?: boolean;
  [propName: string]: any;
}

export default function Link({
  href,
  className,
  onClick,
  children,
  target = '_self',
  inline = false,
  ...rest
}: Props): JSX.Element {
  const isExternal: boolean = useMemo(() => target !== '_self' || /^[http|https]/.test(href), [
    target,
    href,
  ]);

  const linkClickHandler: MouseEventHandler<HTMLAnchorElement> | undefined = (e: any): void => {
    if (typeof onClick === 'function') {
      onClick(e);
    }

    const anchor: string | undefined = href.match(/#[a-zA-Z-]+/g)?.[0];

    if (!isExternal && anchor) {
      e.preventDefault();

      const target: HTMLUnknownElement | null = document.querySelector(anchor);

      if (target) {
        const n: number = target.getBoundingClientRect().top + window.pageYOffset;
        scroller(n);
        window.history.replaceState(null, '', href);
      }
    }
  };

  if (isExternal) {
    return (
      <a
        href={href}
        target={target}
        className={cn(className, styles.link, inline && styles.inline)}
        draggable={false}
        onClick={linkClickHandler}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <GatsbyLink
      to={href || '/'}
      className={cn(className, styles.link, inline && styles.inline)}
      draggable={false}
      onClick={linkClickHandler}
      {...rest}
    >
      {children}
    </GatsbyLink>
  );
}
