# Jpptr

![GitHub top language](https://img.shields.io/github/languages/top/enncy/jpptr) ![GitHub repo size](https://img.shields.io/github/repo-size/enncy/jpptr)  ![npm](https://img.shields.io/npm/v/jpptr) ![npm](https://img.shields.io/npm/dw/jpptr) ![GitHub](https://img.shields.io/github/license/enncy/jpptr)

[中文](https://github.com/enncy/jpptr/blob/main/README.md) | [English](https://github.com/enncy/jpptr/blob/main/README.en-US.md)

[Document](https://enncy.github.io/jpptr/) | [Sample](https://github.com/enncy/jpptr/tree/main/sample)

> a json syntactic sugar for execute puppeteer.     
> Jpptr use json to execute puppeteer, just as you can use javascript to execute puppeteer.         
- you can extend the functionality as much as you want.
- you can dynamically add and modify events.
- and more...

## Example
```json
["goto","https://example.com"]
```
parse to
```json
{
    "use":"function",
    "name":"goto",
    "args":["https://example.com"]
}
```
finally
```js
page.goto("https://example.com")
```

## Document
https://enncy.github.io/jpptr/
## Sample
[https://github.com/enncy/jpptr/tree/main/sample](https://github.com/enncy/jpptr/tree/main/sample)
 