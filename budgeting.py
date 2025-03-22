def load_budgets():
    try:
        with open (BUDGETS_FILE, 'r') as f:
            return json.load(f)
    except (json.JSONDecodeError,
FileNotFoundError):
        default_budgets ={
                "2025": {str(i): 1000 for i in range(1,13)}
        }
        return default_budgets

def save_budgets(budgets):
    with open(BUDGETS_FILE, 'w') as f:
        json.dump(budgets, f, indent=4)

def get_monthly_budget(year,month):
    budgets = load_budgets()
    year_str = str(year)
    month_str = str(month)

    if year_str in budgets and month_str in budgets [year_str]:
        return budgets [year_str][month_str]
    else:
        return 1000
  
monthly_total = sum(float(exp['amount']) for exp in month_expenses)

monthly_budget = get_monthly_budget(year,month)

remaining_budget = monthly_budget - monthly_total

@app.route('/set_budget', methods=['GET','POST'])
def set_budget():
    # here is where we set or update the monthly budget
    if request.method =='POST':
        try:
            year = request.form.get('year', type-int)
            month = request.form.get('month', type=int)
            budget = request.form.get('budget', type=float)

            if not year or not month or not budget:
                flash('All fields are required')
                return redirector(url_for('set_budget'))
            
            budgets = load_budgets()

            year_str = str(year)
            month_str= str(month)

            budget < 0

            if year_str not in budgets:
                budgets[year_str] = {}

            budgets[year_str][month_str] = budget

            save_budgets(budgets)

            flash('Budget updated successfully')
            return redirect(url_for('index', year=year, month=month))
        
        except Exception as e:
            flash(f'Error: {str(e)}')
            return redirect(url_for('set_budget'))
        