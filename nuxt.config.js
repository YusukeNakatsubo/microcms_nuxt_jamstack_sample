// 環境変数を定義
// require('dotenv').config();
const { API_KEY, API_URL } = process.env;

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'microcms_nuxt_jamstack_sample',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // axiosを追加
    "@nuxtjs/axios",
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // 環境変数を定義
  privateRuntimeConfig: {
    apiKey: API_KEY,
    apiUrL: API_URL
  },
  publicRuntimeConfig: {
    apiKey: process.env.NODE_ENV !== 'production' ? API_KEY : undefined
  },
}
