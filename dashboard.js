document.addEventListener("DOMContentLoaded", function () {
    loadBudget();
    loadExpenses();

    // Adding event listeners for buttons
    document.getElementById("save-budget-btn").addEventListener("click", setBudget);
    document.getElementById("add-expense-btn").addEventListener("click", addExpense);
});

// Function to save budget
function setBudget() {
    let budget = parseFloat(document.getElementById("budget").value);

    if (isNaN(budget) || budget <= 0) {
        alert("Please enter a valid budget amount.");
        return;
    }

    // Save budget and remaining budget to localStorage
    localStorage.setItem("budget", budget);
    localStorage.setItem("remainingBudget", budget);

    console.log("Budget saved:", budget);
    updateBudgetDisplay();
}

// Function to update the budget display
function updateBudgetDisplay() {
    let remainingBudget = parseFloat(localStorage.getItem("remainingBudget") || "0");
    let progressBar = document.getElementById("progress-bar");

    // Update progress bar width and status
    let budget = parseFloat(localStorage.getItem("budget") || "0");
    if (budget > 0) {
        let progress = (remainingBudget / budget) * 100;
        progressBar.style.width = progress + "%";
    }
    document.getElementById("budget-status").textContent = "Remaining Budget: $" + remainingBudget.toFixed(2);
}

// Function to load saved budget
function loadBudget() {
    let budget = localStorage.getItem("budget");
    if (budget) {
        document.getElementById("budget").value = budget;
        updateBudgetDisplay();
    }
}

// Function to add expense
function addExpense() {
    let name = document.getElementById("expense-name").value;
    let amount = parseFloat(document.getElementById("expense-amount").value);

    if (!name || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let newExpense = { name, amount, date: new Date().toLocaleDateString() };

    expenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    // Update remaining budget
    let remainingBudget = parseFloat(localStorage.getItem("remainingBudget") || "0");
    remainingBudget -= amount;
    localStorage.setItem("remainingBudget", remainingBudget);

    console.log("Added Expense:", newExpense);
    updateBudgetDisplay();
    loadExpenses();
}

// Function to load and display expenses
function loadExpenses() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let expenseTable = document.getElementById("expense-table");

    // Clear existing table data
    expenseTable.innerHTML = "<tr><th>Name</th><th>Amount</th><th>Date</th></tr>";

    expenses.forEach(exp => {
        let row = `<tr><td>${exp.name}</td><td>$${exp.amount.toFixed(2)}</td><td>${exp.date}</td></tr>`;
        expenseTable.innerHTML += row;
    });

    console.log("Loaded Expenses:", expenses);
}
