# Interface: ConditionWrapper

condition wrapper

## Properties

### cookie

• `Optional` **cookie**: `string`

cookie string of page or frame

**`example`**
```js
// cookie: JESSIONID=ad3f0f0263535855962c79320f4c0523
{
     "use":"switch",
     "case":[
         {
             include:{
                  cookie:"JESSIONID=ad3f0f0263535855962c79320f4c0523"
             },
             // or
             match:{
                 cookie:"JESSIONID=.*"
             },
             actions:[...]
         }
     ]

}
```

___

### html

• `Optional` **html**: `string`

content of page or frame

**`example`**
```js
// <body><h1>hello<h1><h2>world<h2><body>
{
     "use":"switch",
     "case":[
         {
             include:{
                  html:"<h1>hello<h1><h2>world<h2>"
             },
             // or
             match:{
                 html:"hello(.*)world"
             },
             actions:[...]
         }
     ]

}
```

___

### text

• `Optional` **text**: `string`

innerText of document body

**`example`**
```js
// <body><h1>hello<h1><h2>world<h2><body>
{
     "use":"switch",
     "case":[
         {
             include:{
                  text:"hello\nworld"
             },
             // or
             match:{
                 text:"hello(\\s)world"
             },
             actions:[...]
         }
     ]

}
```

___

### url

• `Optional` **url**: `string`

url sub string of page or frame

**`example`**
```js
// https://example.com/?username=Jimmy
{
     "use":"switch",
     "case":[
         {
             include:{
                  url:"username=Jimmy"
             },
             // or
             match:{
                 url:"username=.*"
             },
             actions:[...]
         }
     ]

}
```
