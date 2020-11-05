module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:yaml/recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {},
  plugins: ["yaml"],
};
