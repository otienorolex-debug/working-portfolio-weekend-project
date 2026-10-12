import js from "@eslint/js";
import globals from "globals";

export default [
    {
        ignores: ["node_modules/**", "db/**"],
    },
    {
        files: ["src/**/*.js"],
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.browser,
        },
    },
    {
        files: ["tests/**/*.js"],
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.node,
        },
    },
];
