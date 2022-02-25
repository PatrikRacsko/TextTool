module.exports = {
    env: { node: true },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'prettier'],
    globals: {
      defineEmits: 'readonly',
      defineProps: 'readonly',
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
    },
    rules: { 
      'vue/no-multiple-template-root': 'off',
      'vue/multi-word-component-names': 0
     },
  }