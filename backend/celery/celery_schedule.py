from celery.schedules import crontab
from flask import current_app as app
from backend.celery.tasks import mail_reminder
from backend.models import CustomerInfo, ProfessionalInfo, Request
from datetime import datetime, timedelta

celery_app = app.extensions['celery']

@celery_app.task
def send_daily_reminders():
    # Step 1: Get IDs of professionals who have pending requests
    # ppr= Request.query.all()
    ppr = Request.query.filter(Request.status == "Assigned").with_entities(Request.professional_id).distinct().all()

#     print(pending_professional_ids_1)
# Step 2: Extract just the professional IDs from the query result
    pending_professional_ids_2 = [row[0] for row in ppr]
#     print(pending_professional_ids_2)
# Step 3: Fetch ProfessionalInfo records using these IDs
    professionals_with_pending_requests = ProfessionalInfo.query.filter(ProfessionalInfo.id.in_(pending_professional_ids_2)).all()

    for professional in professionals_with_pending_requests:
        pending_requests = Request.query.filter_by(professional_id=professional.id, status="Assigned").all()
        email_content = "<h2>Pending Service Requests</h2><ul>"
        for request in pending_requests:
            email_content += f"<li>Request ID: {request.id}, Service: {request.service2.name}, Service Description: {request.service2.description}, Customer: {request.customer.name}</li>"
        email_content += "</ul>"

        mail_reminder.delay(professional.user.email,"Daily Reminder: Pending Requests",email_content)
    

@celery_app.task
def send_monthly_reports():
    customers = CustomerInfo.query.all()
    for customer in customers:
        mail_reminder.delay(
            customer.user.email,
            "Monthly Service Report",
            generate_monthly_report(customer.id)
        )

@celery_app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(crontab(hour=12, minute=4), send_daily_reminders.s(), name="daily_reminders")
    sender.add_periodic_task(crontab(hour=7, minute=0, day_of_month=1), send_monthly_reports.s(), name="monthly_reports")

def generate_monthly_report(cust_id):
    last_month = datetime.now() - timedelta(days=30)
    
    completed_requests = Request.query.filter(Request.customer_id==cust_id, Request.completion_date >= last_month, Request.status == 'Completed').all()
    pending_requests = Request.query.filter(Request.customer_id==cust_id, Request.status == 'pending').all()
    Assigned_requests = Request.query.filter(Request.customer_id==cust_id, Request.status == 'Assigned').all()
    total_requests = Request.query.filter(Request.customer_id==cust_id, Request.completion_date >= last_month).all()

    if not total_requests:
        return "<h2>Monthly Activity Report</h2><p>You had no service requests in the past month.</p>"

    report_content = f"""
    <h2>Monthly Activity Report</h2>
    <p>Here is a summary of your service requests for the past month:</p>
    <ul>
        <li><strong>Total Requests:</strong> {len(total_requests)}</li>
        <li><strong>Completed Requests:</strong> {len(completed_requests)}</li>
        <li><strong>Requests Not Assigned:</strong> {len(pending_requests)}</li>
        <li><strong>Requests got Assigned but still not completed:</strong> {len(Assigned_requests)}</li>
    </ul>
    <h3>Completed Services:</h3>
    <ul>
    """
    if not completed_requests:
        report_content += "<li>No services completed in the past month</li>"
    else:    
        for request in completed_requests:
            report_content += f"<li>Service: {request.service2.name} - Completed On: {request.completion_date.strftime('%Y-%m-%d')}</li>"
        report_content += "</ul>"

    return report_content
