from django import forms

from django import forms

class BudgetForm(forms.Form):
    income = forms.IntegerField(label="Monthly Income (₹)", min_value=1)

    rent = forms.IntegerField(label="Rent (₹)", min_value=0)
    groceries = forms.IntegerField(label="Groceries & Food (₹)", min_value=0)
    transport = forms.IntegerField(label="Transport (₹)", min_value=0)
    utilities = forms.IntegerField(label="Phone, Wi-Fi, Electricity (₹)", min_value=0)
    other_basic = forms.IntegerField(label="Other Basic Needs (₹)", min_value=0)

    wants = forms.IntegerField(label="Wants (eating out, shopping, trips) (₹)", min_value=0)


class EMICalculatorForm(forms.Form):
    principal = forms.IntegerField(label="Loan Amount (₹)", min_value=1)
    annual_interest_rate = forms.FloatField(label="Interest Rate (% per year)", min_value=0)
    tenure_years = forms.FloatField(label="Tenure (years)", min_value=0.1)
class SIPCalculatorForm(forms.Form):
    monthly_investment = forms.IntegerField(label="Monthly SIP Amount (₹)", min_value=1)
    annual_return = forms.FloatField(label="Expected Annual Return (% per year)", min_value=0)
    years = forms.FloatField(label="Time Period (years)", min_value=0.5)

class FDvsSIPComparisonForm(forms.Form):
    monthly_investment = forms.IntegerField(label="Monthly Investment Amount (₹)", min_value=1)
    sip_annual_return = forms.FloatField(label="Expected SIP Return (% per year)", min_value=0)
    fd_annual_rate = forms.FloatField(label="FD Interest Rate (% per year)", min_value=0)
    years = forms.FloatField(label="Time Period (years)", min_value=0.5)

class EmergencyFundForm(forms.Form):
    monthly_expenses = forms.IntegerField(label="Your Monthly Essential Expenses (₹)", min_value=1)
    months_to_build = forms.IntegerField(
        label="How many months to save this in?",
        min_value=1,
        max_value=36,
        help_text="Example: 6 or 12 months"
    )

class LoanComparisonForm(forms.Form):
    principal = forms.IntegerField(label="Loan Amount (₹)", min_value=1)

    bankA_rate = forms.FloatField(label="Bank A Interest Rate (% per year)", min_value=0)
    bankA_tenure = forms.FloatField(label="Bank A Tenure (years)", min_value=0.1)
    bankA_processing = forms.IntegerField(label="Bank A Processing Fee (₹)", min_value=0)

    bankB_rate = forms.FloatField(label="Bank B Interest Rate (% per year)", min_value=0)
    bankB_tenure = forms.FloatField(label="Bank B Tenure (years)", min_value=0.1)
    bankB_processing = forms.IntegerField(label="Bank B Processing Fee (₹)", min_value=0)

from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(max_length=120, label="Your Name")
    email = forms.EmailField(label="Your Email")
    message = forms.CharField(widget=forms.Textarea(attrs={"rows": 4}), label="Message")


