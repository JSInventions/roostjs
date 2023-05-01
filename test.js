import roost from "./roost.js";
const JHTML = {
    "doctype": true,
    "lang": "en",
    "head": {
        "metaTags": true,
        "title": "My website",
        "content":{
            "link-0": {
                "ref": "stylesheet",
                "href": "index.css"
            },
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

console.log(
    roost.compile(JHTML)
);