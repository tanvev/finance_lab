from django.urls import path
from . import views

urlpatterns = [

    path('', views.home, name='home'),

    # Modules
    path('module/budgeting/', views.module_budgeting, name='module_budgeting'),
    path('module/investment/', views.module_investment, name='module_investment'),
    path('module/loans/', views.module_loans, name='module_loans'),
    path('module/salary/', views.module_salary, name='module_salary'),
    path('module/credit/card/', views.module_credit_card, name='module_credit_card'),
    path('module/scam/shield/', views.module_scam_shield, name='module_scam_shield'),
    path('module/health/', views.module_health_insurance, name='module_health_insurance'),
    path('module/life/', views.module_life_insurance, name='module_life_insurance'),
    path('module/tax/', views.module_tax, name='module_tax'),

    # Tools overview
    path('tools/', views.tools, name='tools'),

    # Tools
    path('tools/budget-planner/', views.tool_budget_planner, name='tool_budget_planner'),
    path('tools/emi-calculator/', views.tool_emi_calculator, name='tool_emi_calculator'),
    path('tools/sip-calculator/', views.tool_sip_calculator, name='tool_sip_calculator'),
    path('tools/fd-vs-sip/', views.tool_fd_vs_sip, name='tool_fd_vs_sip'),
    path('tools/emergency-fund/', views.tool_emergency_fund, name='tool_emergency_fund'),
    path('tools/loan-comparison/', views.tool_loan_comparison, name='tool_loan_comparison'),
    path('tools/credit-card-coach/', views.tool_credit_card, name='tool_credit_card'),
    path('salary-coach/', views.salary_coach, name='salary_coach'),
    path('salary-plan/', views.salary_plan, name='salary_plan'),
    path('tools/side-hustle/', views.tool_side_hustle, name='tool_side_hustle'),
    path('tools/tax-calculator/', views.tool_tax_calculator, name='tool_tax_calculator'),
    path('tools/pf-calculator/', views.tool_pf_calculator, name='tool_pf_calculator'),
    path('tools/health-insurance-calc/', views.tool_health_insurance_calc, name='tool_health_insurance_calc'),
    path('tools/life-insurance-calc/', views.tool_life_insurance_calc, name='tool_life_insurance_calc'),

    # Quizzes
    path("quiz/budgeting/", views.quiz_budgeting, name="quiz_budgeting"),
    path("quiz/investment/", views.quiz_investment, name="quiz_investment"),
    path("quiz/loans/", views.quiz_loans, name="quiz_loans"),
    path("quiz/salary/", views.quiz_salary, name="quiz_salary"),
    path("quiz/dashboard/", views.quiz_dashboard, name="quiz_dashboard"),
    path("quiz/scams/", views.quiz_scams, name="quiz_scams"),
    path("quiz/creditcard/", views.quiz_creditcard, name="quiz_creditcard"),

    # Daily challenge + badges
    path("challenge/", views.daily_challenge, name="daily_challenge"),
    path("badges/", views.quiz_badges, name="quiz_badges"),

    # Worksheets + About
    path('worksheets/', views.worksheets, name='worksheets'),
    path('about/', views.about, name='about'),
]
