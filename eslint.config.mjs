import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import tsparser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  pluginJs.configs.recommended, //! Enforces all recommnded rules of Eslint @ https://eslint.org/docs/latest/rules/
  ...tseslint.configs.recommended, //! Sets the configuration required for typescript-eslint.
  {
    languageOptions: {
      globals: globals.browser,
      parser: tsparser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  },
  {
    ignores: ["**/*.mjs", "test-results/*", "node-modules/*", "jest.config.js"],
  },
  {
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-explicit-any": ["off"],
      "@typescript-eslint/require-await": "error",
      ...eslintConfigPrettier.rules,
    },
  },
];
