import React from 'react';
import cn from 'classnames';
import { ucfirst } from '@components/utils';
import { ClassName, IconSize } from '@components/types';

import * as styles from './Icon.module.scss';

interface Props {
  src: string;
  className?: ClassName;
  size?: IconSize;
  image?: boolean;
}

export default function Icon({ src, className, size = 'md', image = false }: Props): JSX.Element {
  if (image) {
    return (
      <img
        src={src}
        alt="icon"
        className={cn(className, styles.icon, styles.image, styles[`size${ucfirst(size)}`])}
        draggable={false}
      />
    );
  }

  return (
    <i
      className={cn(styles.icon, image ? null : src, styles[`size${ucfirst(size)}`])}
      draggable={false}
    />
  );
}
