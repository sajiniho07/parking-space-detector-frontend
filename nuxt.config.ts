export default {
  devtools: { enabled: true },

  routeRules: {
    '/api/**': { proxy: { to: 'http://localhost:8080/**' } }
  },
  
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'FetchTest',
        path: '/FetchTest',
        component: resolve(__dirname, 'pages/FetchTest.vue')
      });
      routes.push({
        name: '',
        path: '/',
        component: resolve(__dirname, 'pages/index.vue')
      });
      routes.push({
        name: 'DataEmittingTest',
        path: '/DataEmittingTest',
        component: resolve(__dirname, 'pages/DataEmittingTest.vue')
      });
      routes.push({
        name: 'ParkingSpaceDetector',
        path: '/ParkingSpaceDetector',
        component: resolve(__dirname, 'pages/ParkingSpaceDetector.vue')
      });
    }
  },

  compatibilityDate: '2024-11-12'
};