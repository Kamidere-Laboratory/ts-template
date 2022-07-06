module.exports = {
  env: {
    commonjs: false,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier", "plugin:import/recommended", "plugin:import/typescript"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    warnOnUnsupportedTypeScriptVersion: false,
  },
  globals: {
    NodeJS: true,
  },
  plugins: ["@typescript-eslint", "prettier", "import"],
  rules: {
    "prettier/prettier": "error",
    "no-cond-assign": [2, "except-parens"],
    "no-unused-vars": 0,
    "@typescript-eslint/no-unused-vars": 1,
    "no-empty": [
      "error",
      {
        allowEmptyCatch: true,
      },
    ],
    "prefer-const": [
      "warn",
      {
        destructuring: "all",
      },
    ],
    "spaced-comment": "warn",
    "import/no-unresolved": "error",
    "import/order": [
      2,
      {
        groups: [["builtin", "external"], "internal", "parent", "sibling", "index", "object", "type"],
        "newlines-between": "always",
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "./tsconfig.json",
      },
    },
  },
};
