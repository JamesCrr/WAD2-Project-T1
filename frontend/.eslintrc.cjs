/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "prettier",
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "@vue/eslint-config-prettier/skip-formatting",
  ],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  env: {
    node: true,
  },
}
