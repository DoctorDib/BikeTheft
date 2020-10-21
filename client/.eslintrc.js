module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
    ],
    rules: {
        "linebreak-style": 0,
        "indent": "off",
        "@typescript-eslint/indent": ["error", 4],
        "react/jsx-indent-props": 0,
        "react/jsx-indent": 0,
        "react/require-default-props": 0,
        "react/no-unused-prop-types": 0,
        "@typescript-eslint/no-empty-interface": 0,
        // these two are because eslint hates me
        "no-use-before-define": 0,
        "@typescript-eslint/no-use-before-define": 0,
        "max-len": ["error", { 
            "code": 150,
            "ignoreComments": true,
            "ignoreStrings": true,

        }],
        "react/jsx-props-no-spreading": "off",
        "no-console": 0,
        "no-plusplus": ["error", {
            "allowForLoopAfterthoughts": true,
        }],
        "no-continue": 0,
    },
    env: {
        "browser": true,
        "node": true,
        "commonjs": true,
    },
    settings: {
        react: {
            version: 'detect',
        },
    },

};