// filepath: c:\Users\niyad\OneDrive\Documents\GitHub\thesyntaxerrors\test-script.js
const { JSDOM } = require('jsdom');
const Tesseract = require('tesseract.js');
const pdfjsLib = require('pdfjs-dist');
const fs = require('fs');
const path = require('path');

// Simulate the DOM environment
const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
    <body>
        <input type="file" id="receipt-upload">
        <div id="scan-result"></div>
    </body>
    </html>
`);

global.document = dom.window.document;
global.window = dom.window;

// Mock the file input and result text elements
const fileInput = document.getElementById('receipt-upload');
const resultText = document.getElementById('scan-result');

// Mock the scanReceipt function
function scanReceipt(file) {
    if (!file) {
        console.log("Please upload a receipt image or PDF.");
        return;
    }

    console.log("File uploaded:", file.name);

    if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = function(event) {
            const pdfData = new Uint8Array(event.target.result);

            pdfjsLib.getDocument(pdfData).promise.then(function(pdf) {
                let textContent = '';
                const numPages = pdf.numPages;

                console.log("Number of pages in PDF:", numPages);

                const pagePromises = [];
                for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                    pagePromises.push(pdf.getPage(pageNum).then(function(page) {
                        return page.getTextContent().then(function(text) {
                            text.items.forEach(function(item) {
                                textContent += item.str + ' ';
                            });
                        });
                    }));
                }

                Promise.all(pagePromises).then(function() {
                    console.log("Extracted PDF Text:", textContent);
                    processTextContent(textContent);
                });
            });
        };
        reader.readAsArrayBuffer(file);

    } else if (file.type.startsWith("image/")) {
        console.log("Processing image file:", file.name);

        Tesseract.recognize(
            file,
            'eng',
            {
                logger: m => console.log(m)
            }
        ).then(({ data: { text } }) => {
            console.log("Extracted Image Text:", text);
            processTextContent(text);
        });
    } else {
        console.log("Invalid file type. Please upload a PDF or an image.");
    }
}

// Mock the processTextContent function
function processTextContent(text) {
    console.log("Processing text content:", text);

    const amountMatch = text.match(/(?:\$\s*)?(\d{1,3}(?:,\d{3})*(?:\.\d{2}){1})/);

    if (amountMatch) {
        console.log("Amount matched:", amountMatch[0]);

        const amount = amountMatch[0].replace(/[^0-9\.]+/g, '');
        resultText.innerText = `Amount Spent: $${amount}`;
        console.log("Amount Spent:", amount);
    } else {
        resultText.innerText = "Could not detect the total amount.";
        console.error("Could not detect the total amount.");
    }
}

// Simulate a file upload (replace 'path/to/your/file' with the actual file path)
const filePath = path.resolve('c:/Users/niyad/OneDrive/Documents/GitHub/thesyntaxerrors/pdfrecong/sample-receipt.pdf'); // Update this path
const fileType = 'application/pdf'; // or 'image/jpeg' for images

fs.promises.readFile(filePath).then(buffer => {
    const file = {
        name: path.basename(filePath),
        type: fileType,
        arrayBuffer: () => buffer
    };

    scanReceipt(file);
}).catch(err => {
    console.error("Error reading file:", err);
});