/**
 * @type {import("typedoc").TypeDocOptions}
 */
module.exports = {
    entryPoints: ["./src/index.ts"],
    entryPointStrategy: "Resolve",
    out: "docs",
    name: "jsonsep-api",
    includeVersion: true,
    disableSources: false,
    pretty: true,

    excludeNotDocumented: true,
    excludeExternals: true,
    excludePrivate: true,
    excludeProtected: true,
    sort: ["source-order"],

    githubPages: true,

    theme: "default",
    customCss: "./public/typedoc.theme.css",
    darkHighlightTheme: "github-dark",
    lightHighlightTheme: "github-light",
    markedOptions: {
        highlight: function (code, lang) {
            const hljs = require("highlight.js");
            const language = hljs.getLanguage(lang) ? lang : "plaintext";
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: "radius hljs language-", // highlight.js css expects a top-level 'hljs' class.
    },
};
