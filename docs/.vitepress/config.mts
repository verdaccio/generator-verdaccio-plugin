import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'generator-verdaccio-plugin',
  description: 'Yeoman generator that scaffolds Verdaccio plugins with TypeScript',
  base: '/generator-verdaccio-plugin/',
  themeConfig: {
    logo: 'https://verdaccio.org/img/logo/symbol/svg/verdaccio-tiny.svg',
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Plugin API', link: '/plugins/auth' },
      { text: '@verdaccio/core', link: '/api/' },
      {
        text: 'Verdaccio',
        link: 'https://verdaccio.org',
      },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [{ text: 'Introduction', link: '/guide/' }],
        },
      ],
      '/plugins/': [
        {
          text: 'Plugin API',
          items: [
            { text: 'Auth', link: '/plugins/auth' },
            { text: 'Storage', link: '/plugins/storage' },
            { text: 'Middleware', link: '/plugins/middleware' },
            { text: 'Filter', link: '/plugins/filter' },
          ],
        },
      ],
      '/api/': [
        {
          text: '@verdaccio/core',
          link: '/api/',
          items: [
            {
              text: 'pluginUtils',
              link: '/api/core/@verdaccio/namespaces/pluginUtils/',
              items: [
                { text: 'Plugin', link: '/api/core/@verdaccio/namespaces/pluginUtils/classes/Plugin' },
                { text: 'Auth', link: '/api/core/@verdaccio/namespaces/pluginUtils/interfaces/Auth' },
                { text: 'Storage', link: '/api/core/@verdaccio/namespaces/pluginUtils/interfaces/Storage' },
                { text: 'StorageHandler', link: '/api/core/@verdaccio/namespaces/pluginUtils/interfaces/StorageHandler' },
                { text: 'ExpressMiddleware', link: '/api/core/@verdaccio/namespaces/pluginUtils/interfaces/ExpressMiddleware' },
                { text: 'ManifestFilter', link: '/api/core/@verdaccio/namespaces/pluginUtils/interfaces/ManifestFilter' },
                { text: 'PluginOptions', link: '/api/core/@verdaccio/namespaces/pluginUtils/interfaces/PluginOptions' },
              ],
            },
            {
              text: 'errorUtils',
              link: '/api/core/@verdaccio/namespaces/errorUtils/',
              items: [
                { text: 'getBadData', link: '/api/core/@verdaccio/namespaces/errorUtils/functions/getBadData' },
                { text: 'getBadRequest', link: '/api/core/@verdaccio/namespaces/errorUtils/functions/getBadRequest' },
                { text: 'getConflict', link: '/api/core/@verdaccio/namespaces/errorUtils/functions/getConflict' },
                { text: 'getForbidden', link: '/api/core/@verdaccio/namespaces/errorUtils/functions/getForbidden' },
                { text: 'getInternalError', link: '/api/core/@verdaccio/namespaces/errorUtils/functions/getInternalError' },
                { text: 'getNotFound', link: '/api/core/@verdaccio/namespaces/errorUtils/functions/getNotFound' },
                { text: 'getUnauthorized', link: '/api/core/@verdaccio/namespaces/errorUtils/functions/getUnauthorized' },
              ],
            },
            {
              text: 'pkgUtils',
              link: '/api/core/@verdaccio/namespaces/pkgUtils/',
            },
            {
              text: 'constants',
              link: '/api/core/@verdaccio/namespaces/constants/',
            },
            {
              text: 'searchUtils',
              link: '/api/core/@verdaccio/namespaces/searchUtils/',
            },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/verdaccio/generator-verdaccio-plugin',
      },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Verdaccio Contributors',
    },
    editLink: {
      pattern:
        'https://github.com/verdaccio/generator-verdaccio-plugin/edit/master/docs/:path',
      text: 'Edit this page on GitHub',
    },
  },
});
