module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "plugin:react/recommended", "prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react"],
  rules: {
    quotes: "off",
    // "@typescript-eslint/quotes": "off",
    // "comma-dangle": "off",
    // "@typescript-eslint/comma-dangle": "off",
    // semi: "off",
    // "@typescript-eslint/semi": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },
};
