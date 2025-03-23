from datetime import datetime
from calendar import monthrange
import json
import os.path

def calculate_monthly_total(expenses):
    """Calculate total spending from a lisy of expenses"""
    return sum(float(expense['amount']) for expense in expenses)

def calculate_category_total(expenses, categories):
    """Calculate spending by category"""
    category_totals = {}
    for category in categories:
        category_expenses = [exp for exp in expenses if exp['category']== category]
        if category_expenses:
            total = sum(float(exp['amount'])for exp in category_expenses)
            category_totals[category]={
                'total': total,
                'count': len(category_expenses)
            }
    return category_totals

def calculate_daily_spending(expenses, year, month, days_in_month):
    """Calculate spending by day"""
    daily_spending ={}
    for day in range(1, days_in_month +1):
        date_str = f"{year}-{month:02d}-{day:02d}"
        day_expenses = [exp for exp in expenses if exp['date']== date_str]
        if day_expenses:
            daily_spending[day] = sum(float(exp['amount']) for exp in day_expenses)
    return daily_spending

def is_valid_expense_amount(amount):
    """Validate if expense amount is valid"""
    try:
        amount_value = float(amount)
        return amount_value > 0
    except (ValueError, TypeError):
        return False