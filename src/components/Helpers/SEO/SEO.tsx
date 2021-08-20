import React from 'react';
import { Helmet } from 'react-helmet';
import { SeoData } from '@components/interfaces';

interface Props {
  data: SeoData;
  children?: JSX.Element;
}

export default function SEO({ data, children }: Props) {
  return (
    <Helmet>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords.join(' ')} />
      {children}
    </Helmet>
  );
}
