# Roost.js
A small, flex library that can convert JSON HTML (JHTML, not [Java HTML](https://en.wikipedia.org/wiki/JHTML).) to normal HTML

## What is JHTML?
JSON HTML is a language made in the Roost.js library, you can use it like normal JSON:
```json
{
    "lang": "en",
    "html": {
        "content": {
            "head": {
                "content":{
                    "title": {
                        "content":"My website"
                    },
                    "link-0": {
                        "ref": "stylesheet",
                        "href": "index.css"
                    },
                }
            },
            "body": {
                "content":{
                    "div-1": {
                        "id": "nav",
                        "content": {
                            "h1-2": {
                                "id": "logo",
                                "content": "Welcome!"
                            }
                        }
                    }
                }
            }
        }
    }
}
```
And then can be parsed using `roost.parse(...)`, and it can be adapted to run on an express server. (run `node host/test.js` if cloned this project!)

For legacy purposes, i still kept `roost.compile(...)` which points to `roost.parse(...)`
## Dependecies
* None because Roost was built from scratch without libraries, it's just JavaScript.