import roost from "./roost.min.js";
const JHTML = {
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

console.log(roost.parse(JHTML));