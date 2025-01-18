from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin
from datetime import datetime

db = SQLAlchemy()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    # Flask-Security specific
    fs_uniquifier = db.Column(db.String, unique=True, nullable=False)
    active = db.Column(db.Boolean, default=True)

    # Foreign Key to link with a single Service
    service_id = db.Column(db.Integer, db.ForeignKey("service.id"), nullable=True)

    # Relationships
    roles = db.relationship('Role', secondary='user_roles', backref=db.backref('users', lazy=True))
    professional = db.relationship('ProfessionalInfo', back_populates='user', uselist=False)
    customer = db.relationship('CustomerInfo', back_populates='user', uselist=False)


class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    description = db.Column(db.String, nullable=False)


class UserRoles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    role_id = db.Column(db.Integer, db.ForeignKey("role.id"))


class CustomerInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', back_populates='customer')  # Corrected back_populates reference
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    pin_code = db.Column(db.Integer, nullable=False)


class ProfessionalInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user = db.relationship('User', back_populates='professional')  # Corrected back_populates reference
    name = db.Column(db.String, nullable=False)
    service_name = db.Column(db.String, nullable=False)
    experience = db.Column(db.String, nullable=False)
    address = db.Column(db.String, nullable=False)
    status= db.Column(db.String,default='Pending')
    pin_code = db.Column(db.Integer, nullable=False)

    # Foreign Key linking ProfessionalInfo to Service
    service_id = db.Column(db.Integer, db.ForeignKey('service.id'), nullable=True)
    service = db.relationship("Service", back_populates="professionals")


class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    time_required = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)

    # One-to-Many relationship with ProfessionalInfo
    professionals = db.relationship("ProfessionalInfo", back_populates="service", lazy=True)

    # One-to-Many relationship with Request
    requests = db.relationship("Request", backref="service", lazy=True)


class Request(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("customer_info.id"), nullable=False)
    professional_id = db.Column(db.Integer, db.ForeignKey("professional_info.id"), nullable=True,default="not assigned")
    service_id = db.Column(db.Integer, db.ForeignKey("service.id"), nullable=False)
    status = db.Column(db.String, default='requested')
    request_date = db.Column(db.DateTime,default = datetime.now())
    completion_date = db.Column(db.DateTime, nullable=True)
    rating = db.Column(db.Integer, nullable=True)
    remarks = db.Column(db.String, nullable=True)

    # Relationships
    customer = db.relationship('CustomerInfo', backref='requests')  # Plural backref
    service= db.relationship('Service')
    professional = db.relationship('ProfessionalInfo', backref='requests')  # Plural backref
