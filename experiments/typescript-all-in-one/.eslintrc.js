module.exports = {
    extends: ["next", "prettier"],
    plugins: ["prettier"],
    // settings: {
    //     next: {
    //         rootDir: ["apps/*/", "packages/*/"],
    //     },
    // },
    rules: {
        "prettier/prettier": ["error"],
    },
};
