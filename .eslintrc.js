module.exports = {
    env: {
        es2021: true,
        node: true,
        browser: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: ['./tsconfig.json']
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
    },
    ignorePatterns: ['node_modules/', 'dist/', 'jest.config.ts'],  
};