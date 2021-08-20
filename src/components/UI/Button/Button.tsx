import React from 'react';
import cn from 'classnames';
import { ucfirst } from '@components/utils';
import { Link, Icon, Preloader } from '@components/UI';
import { ButtonSize, ButtonColorScheme, LinkTarget, ClassName } from '@components/types';

import * as styles from './Button.module.scss';

interface Props {
  className?: ClassName;
  onClick?: (e: any) => void;
  title?: string;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  dark?: boolean;
  colorScheme?: ButtonColorScheme;
  icon?: string;
  href?: string;
  target?: LinkTarget;
  [key: string]: any;
}

export default function Button({
  className,
  onClick,
  title = 'Button',
  size = 'md',
  loading = false,
  disabled = false,
  dark = false,
  colorScheme = 'brand',
  icon,
  href,
  target,
  mobileFullWidth,
  ...rest
}: Props): JSX.Element {
  const buttonClickHandler = (e: React.MouseEvent): void => {
    if (typeof onClick === 'function' && !disabled && !loading) {
      onClick(e);
    }
  };

  return (
    <button
      className={cn(
        className,
        styles.button,
        styles[`size${ucfirst(size)}`],
        styles[`colorScheme${ucfirst(colorScheme)}`],
        loading && styles.loading,
        disabled && styles.disabled,
        dark && styles.dark,
        icon && styles.icon,
        href && styles.link,
        mobileFullWidth && styles.mobileFullWidth,
      )}
      onClick={e => buttonClickHandler(e)}
      {...rest}
    >
      <div className={styles.overlay} />
      {href && (
        <div className={styles.linkWrap}>
          <Link href={href} className={styles.link} disabled={disabled} />
        </div>
      )}
      <div className={styles.text}>{icon ? <Icon src={icon} size={size} /> : title}</div>
      {loading && (
        <div className={styles.preloaderWrap}>
          <Preloader size={size} />
        </div>
      )}
    </button>
  );
}
