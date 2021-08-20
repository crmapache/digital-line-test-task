require('./src/assets/scss/app.scss');

const React = require('react');
const PageLayout = require('./src/components/PageLayout/PageLayout').default;

exports.wrapPageElement = ({ element, props }) => {
  return <PageLayout {...props}>{element}</PageLayout>;
};
