import os
import json
import logging
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from calendar import monthrange, month_name
import os.path


def get_monthly_budget(year, month):
    """Get the budget for a specific month and year"""
    budgets = load_budgets()
    year_str = str(year)
    month_str = str(month)

    if year_str in budgets and month_str in budgets[year_str]:
        return budgets[year_str][month_str]
    else:
        return 1000
    
    @app.route('/set_budget', methods=['GET','POST'])
    def set_budget():
        """Set or update the monthly budget"""
        if request.method == 'POST':
            try:
                year = request.form.get('year', type=int)
                month = request.form.get('month', type=int)
                budget = request.form.get('budget', type=float)

                if not year or not month or not budget:
                    flash('All fields are required')
                    return redirect(url_for('set_budget'))
                
                if budget <= 0:
                    flash('Budget must be a positive number')
                    return redirect(url_for('set_budget'))
                
                budgets = load_budgets()

                year_str = str(year)
                month_str = str(month)

                if year_str not in budgets:
                    budgets[year_str] = {}

                budgets[year_str][month_str] = budget

                save_budgets(budgets)

                flash('Budget updated successfully')
                return redirect(url_for('index', year=year, month=month))
            
            except Exception as e:
                flash(f'Error: {str(e)}')
                return redirect(url_for('set_budget'))
























































        
        