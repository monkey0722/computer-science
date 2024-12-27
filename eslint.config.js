const parser = require("@typescript-eslint/parser");

module.exports = [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
    rules: {
      "no-extra-semi": "off",
      "no-irregular-whitespace": ["error", { skipTemplates: true }],
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-useless-constructor": "error",
    },
  },
];
