from flask import Flask, request, jsonify
import budgeting
import expenseCalc

app = Flask(__name__)

@app.route('/calculate-expense', methods=['POST'])
def calculate_expense():
    data = request.json
    amount = data.get('amount', 0)
    result = expenseCalc.calculate(amount)  # Assuming this function exists
    return jsonify({"updated_balance": result})

@app.route('/set-budget', methods=['POST'])
def set_budget():
    data = request.json
    budget = data.get('budget', 0)
    response = budgeting.set_budget(budget)  # Assuming this function exists
    return jsonify({"status": response})

if __name__ == '__main__':
    app.run(debug=True)
