module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  exclude: ['**/node_modules/**/*'],
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    "@snowpack/plugin-typescript",
  ],
  buildOptions: {
    baseUrl: '/',
  }
}; 
