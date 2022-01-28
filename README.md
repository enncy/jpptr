# Jpptr
 
![GitHub top language](https://img.shields.io/github/languages/top/enncy/jpptr) ![GitHub repo size](https://img.shields.io/github/repo-size/enncy/jpptr)  ![npm](https://img.shields.io/npm/v/jpptr) ![npm](https://img.shields.io/npm/dw/jpptr) ![GitHub](https://img.shields.io/github/license/enncy/jpptr)

[中文](https://github.com/enncy/jpptr/blob/main/README.md) | [English](https://github.com/enncy/jpptr/blob/main/README.en-US.md)

[文档](https://enncy.github.io/jpptr-docs/) | [实例](https://github.com/enncy/jpptr/tree/main/sample)
  
> 一个使用 json 语法糖去执行 puppeteer 的框架。     
> 你可以使用 json 去执行 puppeteer , 就像使用 javascript 去执行 puppeteer 一样       
- 你可以方便的的拓展你想要的功能
- 你可以动态的进行动作的添加修改和删除。
- 还有更多功能...请看文档

## 例子
```json
["goto","https://example.com"]
```
转换成
```json
{
    "use":"function",
    "name":"goto",
    "args":["https://example.com"]
}
```
最终执行的代码
```js
page.goto("https://example.com")
```

## 文档
https://enncy.github.io/jpptr-docs/
## 实例

[https://github.com/enncy/jpptr/tree/main/sample](https://github.com/enncy/jpptr/tree/main/sample)
 