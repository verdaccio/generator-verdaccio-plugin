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
