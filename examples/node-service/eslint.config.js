import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["coverage/"] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      eqeqeq: "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
];
