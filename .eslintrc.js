module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
  ],
  plugins: ["@typescript-eslint","eslint-plugin-jest"],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    project: "./tsconfig.eslint.json",
    ecmaVersion: 2019,
    sourceType: "module",
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
    },
  },
  rules: {},
};
