// prettier.config.js or .prettierrc.js
module.exports = {
  trailingComma: "es5",
  tabWidth: 4,
  semi: false,
  singleQuote: true,
  plugins: ['./node_modules/prettier-plugin-svelte'],
  overrides: [
  {
    files: '*.svelte',
    options: { parser: 'svelte' },
  }
]
};