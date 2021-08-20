import * as React from 'react';
import { SEO } from '@components/Helpers';
import data from './data.json';

export default function _404() {
  return (
    <>
      <SEO data={data._404}></SEO>
    </>
  );
}
