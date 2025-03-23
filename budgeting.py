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

def calculate_remaining_budget(budget, expenses):
    """Calculate remaining budget amount"""
    total_spent = calculate_monthly_total(expenses)
    return budget - total_spent

def is_calid_budget_amount(amount):
    """Validate if budget amount is valid"""
    try:
        amount_value = float(amount)
        return amount_value > 0 
    except (ValueError, TypeError):
        return False


