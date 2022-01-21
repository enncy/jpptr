# jpptr
> a json syntactic sugar for execute puppeteer


## Quickly Start
install `jpptr`
```shell
npm install jpptr
```
test.json
```json
{
    "options": {
        "executablePath": "C:/Program Files/Google/Chrome/Application/chrome.exe",
        "defaultViewport": null,
        "headless": false
    },
    "actions": [
        ["goto", "https://enncy.github.io/jpptr/test.html"],
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
                    "path": "./close-dialog-plugin.js"
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
index.js
```js
const { start } = require("jpptr");
const json = require("./test.json");

start(json);

```
close-dialog-plugin.js
```js
module.exports = {
    name: "close-dialog-plugin",
    run({ page, frame, json }) {
        return new Promise((resolve, reject) => {
            page.once("dialog", async (dialog) => {
                setTimeout(async () => {
                    await dialog.dismiss();
                    resolve();
                }, 3000);
            });
        });
    },
};

```
run
```shell
node index.js
```

## Sample

all the sample see [https://github.com/enncy/jpptr/tree/main/sample](https://github.com/enncy/jpptr/tree/main/sample)