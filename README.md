# jsonsep
> a json syntactic sugar for execute puppeteer

## example

test.json
```json
{
    "options": {
        "executablePath": "C:/Program Files/Google/Chrome/Application/chrome.exe",
        "defaultViewport": null,
        "headless": false
    },
    "actions": [
        ["goto", "https://enncy.github.io/jsonsep/test.html"],
        ["type", "#username", "myusername"],
        ["type", "#password", "123456"],
        ["click", "#submit"],
        ["waitForTimeout", 3000],
        ["click", "#example"],
        ["waitForTimeout", 3000],
        {
            "page": -1,
            "use": "function",
            "name": "evaluate",
            "args": ["alert('hello json')"],
            "wait": false,
            "actions": [
                {
                    "use": "module",
                    "path": "./tests/close-dialog-plugin.js"
                },
                ["waitForTimeout", 3000],
                ["close"]
            ]
        },
        ["waitForTimeout", 3000],
        ["close"]
    ]
}

```
test.js
```js
const { start } = require("jsonsep");
const json = require(path.resolve(__dirname, "./test.json"))
start(json)
```