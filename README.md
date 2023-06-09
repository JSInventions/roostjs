# Roost.js
A small, flex library that can convert JSON HTML (JHTML, not [Java HTML](https://en.wikipedia.org/wiki/JHTML).) to normal HTML.
## Try
To test the JSON example app, you need to do these steps:
* Open the terminal, run `git clone https://github.com/JSInventions/roostjs.git`
* Open the source
* Run `nodemon host/test.js`
* Open `localhost:3000`
* Run and Play index.json!
# What is JHTML?
JSON HTML is a language made in the Roost.js library, you can use it like normal JSON:
```json
{
    "doctype": true,
    "lang": "en",
    "stylesheets":[
        "index.css"
    ],
    "head": {
        "metaTags": true,
        "title": "My website",
        "content":{
            "link-0": {
                "ref": "stylesheet",
                "href": "index.css"
            }
        }
    },
    "body": {
        "div-1": {
            "id": "nav",
            "content": {
                "h1-2": {
                    "id": "logo",
                    "content": "Wojtek's website"
                }
            }
        }
    }
}
```
and use `roost.compile()` to convert it to HTML:
```html
<!DOCTYPE HTML>
<html lang="en">
  <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>My website</title>
     <link rel="stylesheet" href="index.css">
     <!-- HTML Document generated by Roost. -->
  </head>
  <body>
     <div id="nav">
         <h1 id="logo">
            Wojtek's website
         </h1>
      </div>
 </body>
</html>
```
# Dependecies
* None because Roost was built from scratch without libraries, it's just JavaScript.
