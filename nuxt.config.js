export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  publicRuntimeConfig: {
    baseURL: process.env.STRAPI_URL,
    apiURL: process.env.VUE_APP_STRAPI_API_URL,
  },
  head: {
    __dangerouslyDisableSanitizers: ['script'],
    bodyAttrs: {
      class: ''
    },
    title: 'GreenPoint agency',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'og:image', hid: 'og:image', content: '/icon_512-min.png' },
      { name: 'og:title', hid: 'og:title', content: 'GreenPoint agency' },
      { name: 'og:site_name', hid: 'og:site_name', content: 'GreenPoint agency' },
      { name: 'apple-mobile-web-app-title', hid: 'apple-mobile-web-app-title', content: 'GreenPoint agency' },
      { name: 'robots', content: 'all' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', hid: 'apple-touch-icon', href: '/icon_512-min.png', sizes: '512x512' },
      { rel: 'shortcut-icon', hid: 'shortcut-icon', href: '/icon_64-min.png', sizes: '64x64' },
    ],
    script: [
      {src: "/script.js", body: true},
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/style.css',
    '~/assets/swiper-bundle.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {src: '~/plugins/globalFuncs'},
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'v-sanitize/nuxt'
  ],

  sanitize: { /* options */ },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      name: 'GreenPoint agency',
      short_name: 'GreenPoint agency',
      display: 'standalone',
      icons: [
        {
          src: '/icon_64-min.png',
          sizes: '64x64',
          type: 'image/png',
          purpose: 'any maskable'
        }, {
          src: '/icon_120-min.png',
          sizes: '120x120',
          type: 'image/png',
          purpose: 'any maskable'
        }, {
          src: '/icon_144-min.png',
          sizes: '144x144',
          type: 'image/png',
          purpose: 'any maskable'
        }, {
          src: '/icon_152-min.png',
          sizes: '152x152',
          type: 'image/png',
          purpose: 'any maskable'
        }, {
          src: '/icon_192-min.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        }, {
          src: '/icon_384-min.png',
          sizes: '384x384',
          type: 'image/png',
          purpose: 'any maskable'
        }, {
          src: '/icon_512-min.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        },
      ],
    },
    workbox: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      compact: true,
    },
  },

  generate: {
    crawler: false,
  },

  router: {},

  robots: {
    UserAgent: '*',
    Disallow: '/strapi'
  },

  // sitemap: {
  //   xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  //   path: '/sitemap.xml',
  //   hostname: 'https://senderonosara.com',
  // },

  target: 'static',

  ssr: true,
}
