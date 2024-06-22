"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xmldom_1 = require("xmldom");
var node_fs_1 = require("node:fs");
var xmlData;
try {
    xmlData = (0, node_fs_1.readFileSync)('./TextFile/input.txt', 'utf-8');
    console.log("[ XML Loaded ]\n".concat(xmlData));
}
catch (e) {
    console.log(e);
}
function printTitleAttributes(xml) {
    var xmlDoc = new xmldom_1.DOMParser().parseFromString(xml, "text/xml");
    var books = xmlDoc.getElementsByTagName("a");
    var output;
    for (var i = 0; i < books.length; i++) {
        var title = void 0;
        title = books[i].getAttribute("title", function (e, d) { console.log("here"); });
        if (title) {
            var textContent = books[i].textContent || "";
            var match = textContent.match(/: (.*?) -/);
            var owner = match ? match[1] : "Unknown";
            if (books.length === 1)
                return "".concat(title, " (").concat(owner, ")");
            if (i === 0)
                output = "".concat(title, " (").concat(owner, "), ");
            else if (i === books.length - 1)
                output = output + "".concat(title, " (").concat(owner, ")");
            else
                output = output + "".concat(title, " (").concat(owner, "), ");
        }
    }
    return output;
}
(0, node_fs_1.writeFile)('./TextFile/output.txt', printTitleAttributes(xmlData), function (err) { if (err)
    console.log(err); });
