import React from 'react';
import { Helmet } from 'react-helmet';
import { Main } from '@components/Blocks';
import { Modal } from '@components/UI';
import { ModalContext } from '@components/utils';

import * as styles from './PageLayout.module.scss';

interface Props {
  children?: JSX.Element;
}

export default function PageLayout({ children }: Props) {
  return (
    <ModalContext.Provider value={Modal}>
      <div className={styles.layout} id="page">
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="format-detection" content="telephone=no" />
        </Helmet>
        <Main>{children}</Main>
      </div>
    </ModalContext.Provider>
  );
}
