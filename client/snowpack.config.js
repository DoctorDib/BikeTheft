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

    ["@snowpack/plugin-run-script", {
      "cmd": "eslint \"src/**/*.{js,jsx,ts,tsx}\"",
      // Optional: Use npm package "watch" to run on every file change
      "watch": "watch \"$1\" src"
    }]
  ],
  buildOptions: {
    baseUrl: '/',
  }
}; 
