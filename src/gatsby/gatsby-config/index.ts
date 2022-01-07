import { GatsbyConfig } from 'gatsby';
import remarkExternalLinks from 'remark-external-links';

const { GATSBY_URL = 'http://localhost:5000' } = process.env;

/**
 * The plugins below must come last in the ordering of the plugins because they
 * are dependent on transforming output of the previously listed plugins.
 */
const THESE_PLUGINS_MUST_COME_LAST = [
  'gatsby-plugin-sri',
];

const GATSBY_ROOT = `${__dirname}/../../../`;

const GLOBALLY_IGNORED_SOURCE_FILES = [
  '**/_**/*',
  '**/_*',
];

export default {
  plugins: [
    'gatsby-remark-images',
    {
      options: {
        ignore: [
          ...GLOBALLY_IGNORED_SOURCE_FILES,
          '**/index.mdx',
        ],
        name: 'posts',
        path: `${GATSBY_ROOT}/content/`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    {
      options: {
        defaultLayouts: {
          posts: require.resolve(`${GATSBY_ROOT}src/templates/Post`),
        },
        extensions: [
          '.mdx',
          '.md',
        ],
        gatsbyRemarkPlugins: [
          {
            options: {
              backgroundColor: 'transparent',
              disableBgImageOnAlpha: true,
              linkImagesToOriginal: true,
              maxWidth: 1200,
            },
            resolve: 'gatsby-remark-images',
          },
          {
            // eslint-disable-next-line max-len
            resolve: require.resolve(`${GATSBY_ROOT}/plugins/gatsby-remark-mdx-v2-images`),
          },
        ],
        remarkPlugins: [
          remarkExternalLinks,
        ],
      },
      resolve: 'gatsby-plugin-mdx',
    },
    'gatsby-plugin-react-helmet',
    {
      options: {
        name: 'images',
        path: `${GATSBY_ROOT}src/images`,
      },
      resolve: 'gatsby-source-filesystem',
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-ts-checker',
    // 'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      options: {
        background_color: '#0b8ad0',
        display: 'minimal-ui',
        icon: 'src/images/maxmind-icon.png',
        name: 'MaxMind Developer Portal',
        start_url: '/',
        theme_color: '#0b8ad0',
      },
      resolve: 'gatsby-plugin-manifest',
    },
    {
      options: {
        rule: {
          include: /assets/,
        },
      },
      resolve: 'gatsby-plugin-react-svg',
    },
    'gatsby-plugin-remove-trailing-slashes',
    {
      options: {
        trackingIds: [],
      },
      resolve: 'gatsby-plugin-google-gtag',
    },
    'gatsby-plugin-advanced-sitemap',
    {
      options: {
        env: {
          nonProduction: {
            policy: [
              {
                disallow: [
                  '/',
                ],
                userAgent: '*',
              },
            ],
          },
          production: {
            policy: [
              {
                allow: '/',
                userAgent: '*',
              },
            ],
          },
        },
        host: GATSBY_URL,
        resolveEnv: () => GATSBY_URL === 'https://blog.maxmind.com'
          ? 'production'
          : 'nonProduction',
        sitemap: `${GATSBY_URL}/sitemap.xml`,
      },
      resolve: 'gatsby-plugin-robots-txt',
    },
    // {
    //   options: {
    //     analyzerPort: 3000,
    //     production: true,
    //   },
    //   resolve: 'gatsby-plugin-webpack-bundle-analyzer',
    // },
    ...THESE_PLUGINS_MUST_COME_LAST,
  ],
  siteMetadata: {
    author: '@maxmind',
    // eslint-disable-next-line max-len
    description: 'Develop applications using industry-leading IP intelligence and risk scoring.',
    siteUrl: GATSBY_URL,
    title: 'MaxMind Blog',
  },
} as GatsbyConfig;
