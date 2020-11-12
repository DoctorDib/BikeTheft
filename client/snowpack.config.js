const fs = require("fs");

// Will be `dev` or `build`.  These are the arguments passed to snowpack.
const [, , operation] = process.argv;

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
      "cmd": "eslint \"src/**//*.{js,jsx,ts,tsx}\"",
      // Optional: Use npm package "watch" to run on every file change
      "watch": "watch \"$1\" src"
    }],
  ],
  buildOptions: {
    baseUrl: '/',
  },
  installOptions: {
    polyfillNode: true,
    rollup: {
      plugins: [
        {
          /*
           * Work around issue bundling @aws-amplify packages, namely the error:
           *
           *     The 'this' keyword is equivalent to 'undefined' at the top level
           *     of an ES module, and has been rewritten
           *
           * These errors arise in the packages' `lib-esm` builds, which are
           * mostly ES2015 modules but include shims that trigger Rollup errors.
           *
           * This workaround redirects requests for the indexes of those
           * packages to the single-file dists that Rollup can process.
           *
           * See https://github.com/pikapkg/snowpack/discussions/718
           */
          /*name: "redirect-aws-amplify",
          load(id) {
            // This is only needed for (and only works in) production mode,
            // though note that in dev mode you still get many warnings.
            if (operation === "build") {
              const alternate = id.replace(
                /@aws-amplify\/(.+?)\/lib-esm\/index\.js$/,
                "@aws-amplify/$1/dist/aws-amplify-$1.js"
              );
              if (alternate !== id) {
                return fs.readFileSync(alternate, "utf-8");
              }
            }
          },*/
        },
      ],
    },
  },
}; 
