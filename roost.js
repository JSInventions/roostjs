function beautify(htmlString) {
    let indentation = 2, output = "";

    const regex = /(<\/?\w+(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)*\s*\/?>)|([^<]+)/g, matches = htmlString.matchAll(regex);

    for (const match of matches) {
        const tag = match[1], text = match[2];
        if (tag) {
            const isClosingTag = tag.startsWith("</");
            if (isClosingTag) indentation--;
            output += "   ".repeat(indentation) + tag + "\n";
            if (!isClosingTag) indentation++;
        } else {
            output += "   ".repeat(indentation) + text.trim() + "\n";
        }
    }
    return output.trim();
}


function generateElement(tag, attributes, content) {
    let element = `<${tag}`;
    for (let attribute in attributes) {
        if (attributes.hasOwnProperty(attribute)) {
            let value = attributes[attribute];
            if (typeof value === "string") {
                value = value.replace(/"/g, "&quot;");
            }
            element += ` ${attribute}="${value}"`;
        }
    }
    if (content === undefined || content === null) {
        element += `>`;
    } else {
        element += `>${content}</${tag}>`;
    }
    return element;
}
function JHTMLtoHTML(jhtml, level = 0) {
    let html = "";
    for (let element in jhtml) {
        if (jhtml.hasOwnProperty(element)) {
            let tag = element.split("-")[0], id = element.split("-")[1];
            if (id === undefined) {
                id = "0";
            }
            let attributes = jhtml[element], content = "";
            if (typeof attributes === "object") {
                if (attributes.hasOwnProperty("content")) {
                    if (typeof attributes["content"] === "object") {
                        content = JHTMLtoHTML(attributes["content"], level + 1);
                    } else {
                        content = attributes["content"];
                    }
                    delete attributes["content"];
                }
                html += `${generateElement(element, attributes, content)}`;
            } else if (tag !== "img") {
                content = attributes;
                let indent = "   ".repeat(level);
                if (tag === "head" && attributes.hasOwnProperty("content")) {
                    html += `${indent}<${tag}>\n`;
                    let headContent = attributes["content"];
                    for (let contentElement in headContent) {
                        if (headContent.hasOwnProperty(contentElement)) {
                            let contentTag = contentElement.split("-")[0], contentId = contentElement.split("-")[1];
                            if (contentId === undefined) {
                                contentId = "0";
                            }
                            let contentAttributes = headContent[contentElement], contentContent = "";
                            if (typeof contentAttributes === "object") {
                                if (contentAttributes.hasOwnProperty("content")) {
                                    if (typeof contentAttributes["content"] === "object") {
                                        contentContent = JHTMLtoHTML(contentAttributes["content"], level + 2);
                                    } else {
                                        contentContent = contentAttributes["content"];
                                    }
                                    delete contentAttributes["content"];
                                }
                                html += `${indent}  ${generateElement(contentElement, contentAttributes, contentContent)}`;
                            }
                        }
                    }
                    html += `${indent}</${tag}>\n`;
                } else {
                    html += `\n${indent}<${tag} ${stringifyAttributes(attributes)}>${content}`;
                    if (tag !== "br") {
                        html += `${JHTMLtoHTML({ [`/${element}`]: {} }, level + 1)}`;
                    }
                }
            } else {
                let indent = "   ".repeat(level);
                html += `\n${indent}<${tag} ${stringifyAttributes(attributes)}>`;
            }
        }
    }
    html = html.replace(/-\d+/g, "");

    if (level === 0) {
        html += "\n";
    }
    const tml = beautify(html);
    return tml;
}

function stringifyAttributes(attributes) {
    let attrStr = "", value = ""
    for (let attr in attributes) {
        if (attributes.hasOwnProperty(attr)) {
            value = attributes[attr];
            if (typeof value === "string") {
                value = value.replace(/"/g, '\\"');
                attrStr += `${attr}="${value}" `;
            } else {
                attrStr += `${attr}=${value} `;
            }
        }
    }
    return attrStr.trim();
}
const roost = {
    alerts: [],
    compile: (js) => {
        let html = "";
        if (js.doctype === true || js.doctype === "html" && !js.lang === undefined) {
            html = `<!DOCTYPE HTML>\n<html lang="${js.lang}">\n`;
        } else if (js.lang === undefined) {
            err("[roost] no lang selected, selecting en");
            html = `<!DOCTYPE HTML>\n<html lang="en">\n`;

        } else {
            err("[roost] quirks mode detected");
        }
        if (js.head === undefined) {
            err("[roost] no head detected");
            html = `${html}   <head>\n`;
        } else {
            html = `${html}  <head>\n`;
            if (js.head.metaTags === undefined || true || false) {
                if (js.head.metaTags === undefined) {
                    console.log("[roost] No meta tags template detected");
                }
                if (!js.head.metaTags === false) {
                    html = `${html}     <meta charset="UTF-8">\n     <meta http-equiv="X-UA-Compatible" content="IE=edge">\n     <meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
                }
            }
            if (js.head.title === undefined) {
                err("[roost] no title detected");
            } else {
                html = `${html}     <title>${js.head.title}</title>\n`;
            }
            if (js.head.content === !undefined) {
                html = `${html}    ${JHTMLtoHTML(js.head.content)}\n`
            }
            if (js.stylesheets) {
                js.stylesheets.forEach(element => {
                    html = `${html}     <link rel="stylesheet" href="${element}">\n`
                });
            }
            if (js.scripts) {
                js.scripts.forEach(element => {
                    html = `${html}     <script type="module" src="${element}"></script>\n`
                });
            }
            html = `${html}     <!-- HTML Document generated by Roost. -->\n  </head>\n`
        }
        if (js.body === undefined) {
            err("[roost] no body detected");
            html = `${html}  <body>\n     <h1>Website generated by Roost</h1>\n   </body>`;
        } else {
            html = `${html}  <body>\n     ${JHTMLtoHTML(js.body)}\n </body>\n`;
        }
        html = `${html}</html>`;
        return html;

        function err(err) {
            console.log(err)
            roost.alerts.push(err);
        }
    }
};

export default roost;
