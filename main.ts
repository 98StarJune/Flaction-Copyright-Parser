import { DOMParser } from 'xmldom';
import { writeFile, readFileSync } from "node:fs";

let xmlData;
try {
    xmlData = readFileSync('./TextFile/input.txt', 'utf-8');
    console.log(`[ XML Loaded ]\n${xmlData}`);
}catch (e){
    console.log(e);
}

function printTitleAttributes(xml: string): string {
    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
    const books = xmlDoc.getElementsByTagName("a");
    let output: string;

    for (let i = 0; i < books.length; i++) {
        const title = books[i].getAttribute("title");
        if (title) {
            const textContent = books[i].textContent || "";
            const match = textContent.match(/: (.*?) -/);
            const owner = match ? match[1] : "Unknown";
            if(books.length === 1) return `${title} (${owner})`
            if(i === 0) output =`${title} (${owner}), `
            else if (i === books.length - 1) output = output + `${title} (${owner})`
            else output = output + `${title} (${owner}), `
        }
    }
    return output;
}

writeFile('./TextFile/output.txt', printTitleAttributes(xmlData), err => { if(err) console.log(err)})