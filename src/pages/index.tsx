import React from 'react';
import { SEO } from '@components/Helpers';
import data from './data.json';
import { App } from '@components/Sections';

export default function index() {
  return (
    <>
      <SEO data={data.index}></SEO>
      <App />
    </>
  );
}
