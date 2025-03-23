function nextPage(pageNumber) {
    document.querySelectorAll('.onboarding-page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`page-${pageNumber}`).classList.add('active');
}

function toggleAuthMode() {
    let title = document.getElementById('auth-title');
    let button = document.getElementById('auth-btn');
    let toggleText = document.getElementById('toggle-auth');
    document.getElementById('error-message').style.display = 'none';

    if (button.innerText === "Sign Up") {
        title.innerText = "Login";
        button.innerText = "Login";
        toggleText.innerHTML = "Don't have an account? <a href='#' onclick='toggleAuthMode()'>Sign Up</a>";
    } else {
        title.innerText = "Create an Account";
        button.innerText = "Sign Up";
        toggleText.innerHTML = "Already have an account? <a href='#' onclick='toggleAuthMode()'>Login</a>";
    }
}

function handleAuth() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let authButton = document.getElementById('auth-btn');
    let errorMessage = document.getElementById('error-message');
    
    if (!username || !password) {
        alert("Please fill out all fields.");
        return;
    }

    if (authButton.innerText === "Sign Up") {
        if (localStorage.getItem(username)) {
            alert("Username already exists!");
        } else {
            localStorage.setItem(username, password);
            alert("Account created successfully! Please login.");
            toggleAuthMode();
        }
    } else {
        let storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            alert("Login successful! Welcome to SpendWise.");
            nextPage(4);  // Go to the Dashboard page (page 4) after login
        } else {
            errorMessage.style.display = 'block';
        }
    }
}

function nextPage(pageNumber) {
    document.querySelectorAll('.onboarding-page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`page-${pageNumber}`).classList.add('active');
}


function scanReceipt() {
    let fileInput = document.getElementById('receipt-upload').files[0];
    let resultText = document.getElementById('scan-result');

    if (!fileInput) {
        alert("Please upload a receipt image or PDF.");
        return;
    }

    // Check if the uploaded file is a PDF
    if (fileInput.type === "application/pdf") {
        let reader = new FileReader();
        reader.onload = function(event) {
            let pdfData = new Uint8Array(event.target.result);
            
            // Use pdf.js to extract text from the PDF
            pdfjsLib.getDocument(pdfData).promise.then(function(pdf) {
                let textContent = '';
                let numPages = pdf.numPages;

                // Extract text from each page of the PDF
                let pagePromises = [];
                for (let pageNum = 1; pageNum <= numPages; pageNum++) {
                    pagePromises.push(pdf.getPage(pageNum).then(function(page) {
                        return page.getTextContent().then(function(text) {
                            text.items.forEach(function(item) {
                                textContent += item.str + ' ';
                            });
                        });
                    }));
                }

                // Wait for all pages to be processed
                Promise.all(pagePromises).then(function() {
                    console.log("Extracted PDF Text:", textContent);  // Log the extracted text for debugging
                    processTextContent(textContent);  // Process the extracted text
                });
            });
        };
        reader.readAsArrayBuffer(fileInput);

    } else if (fileInput.type.startsWith("image/")) {
        // Process image files using Tesseract.js
        Tesseract.recognize(
            fileInput,
            'eng',
            {
                logger: m => console.log(m)
            }
        ).then(({ data: { text } }) => {
            console.log("Extracted Image Text:", text);  // Log the extracted text for debugging
            processTextContent(text);  // Process the extracted text
        });
    } else {
        alert("Invalid file type. Please upload a PDF or an image.");
    }
}

// Process the extracted text to find the amount spent
function processTextContent(text) {
    console.log("Extracted Text:", text);  // Log the extracted text for debugging

    // Regular expression for matching valid decimal amounts, with or without the dollar sign
    let amountMatch = text.match(/(?:\$\s*)?(\d{1,3}(?:,\d{3})*(?:\.\d{2}){1})/);

    if (amountMatch) {
        // Clean the matched string by removing non-numeric characters except the dot
        let amount = amountMatch[0].replace(/[^0-9\.]+/g, '');  
        let resultText = document.getElementById('scan-result');
        resultText.innerText = `Amount Spent: $${amount}`;
        localStorage.setItem('lastReceiptAmount', amount);
        alert("Receipt scanned successfully!");
    } else {
        let resultText = document.getElementById('scan-result');
        resultText.innerText = "Could not detect the total amount.";
        console.error("Could not detect the total amount.");  // Log the error for debugging
    }
}


