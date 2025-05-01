// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import rehypeMermaid from 'rehype-mermaid'

// https://astro.build/config
export default defineConfig({
  site: 'https://git2btech.github.io',
  base: '/Doc_Android_TEF_SDK',
  redirects: {
    "/": "/Doc_Android_TEF_SDK/en",
  },
  devToolbar: {
    enabled: false
  },
  markdown: {
    rehypePlugins: [[rehypeMermaid, {
      strategy: 'img-svg'
    }]],
    syntaxHighlight: {
      type: 'shiki',
      excludeLangs: ['mermaid', 'math'],
    },
  },
  integrations: [
    starlight({
      logo: {
        src: './src/assets/logo.png',
        replacesTitle: true
      },
      defaultLocale: 'en',
      locales: {
        en: {
          label: 'English',
          lang: 'en-US',
        },
        'pt-br': {
          label: 'Brazilian Portuguese',
          lang: 'pt-BR',
        },
      },
      social: {
        github: 'https://github.com/git2btech/Android_TEF_SDK',
      },
      customCss: [
        './src/styles/custom.css',
      ],
      title: '2BTech',
      sidebar: [
        {
          slug: 'introduction', label: 'Introduction', translations: {
            'pt-BR': 'Introdução',
          }, link: '/introduction'
        },
        {
          label: 'SDK', items: [
            {
              slug: 'sdk/introduction', label: 'Introduction', translations: {
                'pt-BR': 'Introdução',
              }, link: '/sdk/introduction'
            },
            {
              slug: 'sdk/integration', label: 'Integration', translations: {
                'pt-BR': 'Integração',
              }, link: '/sdk/integration'
            },
            {
              label: 'Classes', translations: { 'pt-BR': 'Classes' }, items: [
                { slug: 'sdk/classes/consumer', label: 'Consumer' },
                { slug: 'sdk/classes/transaction', label: 'Transaction', badge: { text: 'I', variant: 'default' } },
                { slug: 'sdk/classes/configuration', label: 'Configuration', badge: { text: 'I', variant: 'default' } },
                { slug: 'sdk/classes/payment', label: 'Payment', badge: { text: 'I', variant: 'default' } },
                { slug: 'sdk/classes/tmt', label: 'TMT', badge: { text: 'I', variant: 'default' } },
              ]
            },
          ]
        },
        {
          label: 'APP', items: [
            {
              slug: 'app/introduction', label: 'Introduction', translations: {
                'pt-BR': 'Introdução',
              }, link: '/app/introduction'
            },

          ]
        },
      ],
    }),
  ],
});
