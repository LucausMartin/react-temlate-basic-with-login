import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from "eslint-plugin-prettier/recommended";

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended, eslintConfigPrettier],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-duplicate-imports': 'error',
    'react-hooks/exhaustive-deps': 0,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ["@myHooks", "./src/hooks"],
          ["@myComponents", "./src/components"],
          ["@myUtils", "./src/utils"],
          ["@myStore", "./src/store"],
          ["@myTypes", "./src/types"],
          ["@myPages", "./src/pages"],
          ["@myAssets", "./src/assets"],
          ["@myContants", "./src/constants"],
        ]
      }
    }
  }
})
