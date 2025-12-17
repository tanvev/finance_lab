from django.shortcuts import render
from math import pow

# MODULE PAGES
def home(request):
    return render(request, "home.html")

def module_budgeting(request):
    return render(request, "module_budgeting.html")

def module_investment(request):
    return render(request, "module_investment.html")

def module_loans(request):
    return render(request, "module_loans.html")

def module_salary(request):
    return render(request, "module_salary.html")

def module_credit_card(request):
    return render(request, "module_credit_card.html")

def module_scam_shield(request):
    return render(request, "module_scam_shield.html")

def module_health_insurance(request):
    return render(request, "module_health_insurance.html")

def module_life_insurance(request):
    return render(request, "module_life_insurance.html")

def module_tax(request):
    return render(request, "module_tax.html")


# TOOLS OVERVIEW
def tools(request):
    return render(request, "tools.html")

def worksheets(request):
    return render(request, "worksheets.html")

def about(request):
    return render(request, "about.html")

# ===========================
# ALL TOOL VIEWS (ONE COPY ONLY)
# ===========================

from .forms import (
    BudgetForm, EMICalculatorForm, SIPCalculatorForm,
    FDvsSIPComparisonForm, EmergencyFundForm, LoanComparisonForm
)

def tool_budget_planner(request):
    result = None
    form = BudgetForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        income = form.cleaned_data['income']
        total_needs = (
            form.cleaned_data['rent'] +
            form.cleaned_data['groceries'] +
            form.cleaned_data['transport'] +
            form.cleaned_data['utilities'] +
            form.cleaned_data['other_basic']
        )
        wants = form.cleaned_data['wants']
        total_planned = total_needs + wants
        savings = income - total_planned
        result = {
            "income": income,
            "total_needs": total_needs,
            "wants": wants,
            "total_planned": total_planned,
            "savings": savings,
        }
    return render(request, "tool_budget_planner.html", {"form": form, "result": result})


def tool_emi_calculator(request):
    form = EMICalculatorForm(request.POST or None)
    result = None
    if request.method == "POST" and form.is_valid():
        P = form.cleaned_data["principal"]
        r = form.cleaned_data["annual_interest_rate"] / 12 / 100
        n = form.cleaned_data["tenure_years"] * 12
        emi = P / n if r == 0 else P * r * pow(1+r, n) / (pow(1+r, n) - 1)
        result = {"emi": round(emi)}
    return render(request, "tool_emi_calculator.html", {"form": form, "result": result})


def tool_sip_calculator(request):
    form = SIPCalculatorForm(request.POST or None)
    result = None
    if request.method == "POST" and form.is_valid():
        pass
    return render(request, "tool_sip_calculator.html", {"form": form, "result": result})


def tool_fd_vs_sip(request):
    form = FDvsSIPComparisonForm(request.POST or None)
    result = None
    if request.method == "POST" and form.is_valid():
        pass
    return render(request, "tool_fd_vs_sip.html", {"form": form, "result": result})


def tool_emergency_fund(request):
    form = EmergencyFundForm(request.POST or None)
    result = None
    if request.method == "POST" and form.is_valid():
        pass
    return render(request, "tool_emergency_fund.html", {"form": form, "result": result})


def tool_loan_comparison(request):
    form = LoanComparisonForm(request.POST or None)
    result = None
    if request.method == "POST" and form.is_valid():
        pass
    return render(request, "tool_loan_comparison.html", {"form": form, "result": result})


def tool_credit_card(request):
    return render(request, "tool_credit_card.html")

def tool_side_hustle(request):
    return render(request, "tools/side_hustle.html")

def tool_tax_calculator(request):
    return render(request, "tool_tax_calculator.html")

def tool_pf_calculator(request):
    return render(request, "tool_pf_calculator.html")

def tool_health_insurance_calc(request):
    return render(request, "tool_health_insurance_calc.html")

def tool_life_insurance_calc(request):
    return render(request, "tool_life_insurance_calc.html")


# ===========================
# QUIZZES
# ===========================

def quiz_budgeting(request): return render(request, "quiz_budgeting.html")
def quiz_investment(request): return render(request, "quiz_investment.html")
def quiz_loans(request): return render(request, "quiz_loans.html")
def quiz_salary(request): return render(request, "quiz_salary.html")
def quiz_dashboard(request): return render(request, "quiz_dashboard.html")
def quiz_badges(request): return render(request, "quiz_badges.html")
def quiz_scams(request): return render(request, "quiz_scams.html")
def quiz_creditcard(request): return render(request, "quiz_creditcard.html")
def daily_challenge(request): return render(request, "daily_challenge.html")

def salary_coach(request): return render(request, "salary_coach.html")
def salary_plan(request): return render(request, "salary_plan.html")
