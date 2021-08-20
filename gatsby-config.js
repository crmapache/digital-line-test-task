const path = require('path');

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          placeholder: 'blurred',
          quality: 90,
        },
        failOnError: true,
        stripMetadata: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        lang: 'ru',
        start_url: '/',
        icon: 'src/assets/images/favicon.png',
        display: 'minimal-ui',
      },
    },
    'gatsby-plugin-sass',
  ],
};
