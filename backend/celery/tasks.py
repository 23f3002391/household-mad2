from celery import shared_task
import time
import flask_excel as excel
from backend.models import Request
from flask import Response
import os
from backend.celery.mail_service import send_mail

@shared_task(ignore_result= False)
def add(x,y):
    return x+y




@shared_task(bind=True, ignore_result=False)
def create_csv(self):
    # Fetch completed requests
    resource = Request.query.all()

    # Convert SQLAlchemy objects to a list of dictionaries
    resource_data = [
        {column.name: getattr(row, column.name) for column in Request.__table__.columns}
        for row in resource
    ]
    print(resource_data)

    # Ensure the download directory exists
    download_dir = "./backend/celery/user-downloads/"
    os.makedirs(download_dir, exist_ok=True)

    # Generate CSV file name using the Celery task ID
    task_id = self.request.id
    filename = f'blog_data_{task_id}.csv'
    file_path = os.path.join(download_dir, filename)

    # Generate CSV response using flask_excel
    csv_out = excel.make_response_from_records(resource_data, file_type="csv")

    # Write to file
    with open(file_path, 'wb') as file:
        file.write(csv_out.data)

    return filename  # Return the filename for tracking

@shared_task(ignore_result=True)
def mail_reminder(to, subject, content):
    send_mail(to, subject, content)

    
    