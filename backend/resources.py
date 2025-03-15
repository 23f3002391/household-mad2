from flask import jsonify, request
from flask_restful import Api, Resource, fields, marshal_with
from flask_security import auth_required, current_user,roles_required
import time
from flask import current_app as app
from backend.models import *

datastore = app.security.datastore
cache = app.cache

api = Api(prefix='/api')



@app.get('/cache')
@cache.cached(timeout = 5)
def cach():
    return {'time' : str(datetime.now())}

# Fields for service representation
service_fields = {
    'id': fields.Integer,
    'name': fields.String,
    'price': fields.Integer,
    'time_required': fields.Integer,
    'description': fields.String,
    'professionals': fields.List(fields.String),
}

class ServiceAPI(Resource):

    @auth_required
    @marshal_with(service_fields)
    def get(self, service_id):
        service = Service.query.get(service_id)

        if not service:
            return {"message": "Service not found"}, 404
        return service
    
    @auth_required('token')
    @roles_required('admin')
    @marshal_with(service_fields)
    def put(self,service_id):
        service= Service.query.filter_by(id= service_id).first()
        data= request.get_json()
        
        service.name = data.get('name')
        service.price = data.get('price')
        service.time_required = data.get('time_required')
        service.description = data.get('description')
        db.session.commit()
        

        
    
    @auth_required('token')
    @roles_required('admin')
    def delete(self, service_id):
        service = Service.query.get(service_id)
        db.session.delete(service)
        db.session.commit()

class ServiceListAPI(Resource):

    @auth_required('token')
    @roles_required("admin")
    @marshal_with(service_fields)
    def get(self):
        services = Service.query.all()
        return services
    
    @auth_required('token')
    @roles_required("admin")
    @marshal_with(service_fields)
    def post(self):
        data = request.get_json()
        name = data.get('name')
        price = data.get('price')
        time_required = data.get('time_required')
        description = data.get('description')

        service = Service(name=name, price=price, time_required=time_required, description=description)

        db.session.add(service)
        db.session.commit()
        return jsonify({'message': 'Service created successfully'})
@auth_required('token')
@app.route("/service_list/<string:category>",methods=["GET"])  
@marshal_with(service_fields)  
def s_list(category):
    services= Service.query.filter_by(name=category).all()
    return services    


# Fields for user listing
user_list_fields = {
    'id': fields.Integer,
    'email': fields.String,
    'service_id': fields.Integer,
    'active': fields.Boolean,
}


#Customer Api

    
customer_fields={
    "id": fields.Integer,
    "user_id":fields.Integer,
    "name": fields.String,
    "address": fields.String,
    "phone_no": fields.String,
    "pin_code":fields.Integer,
    "user": fields.Nested({
        "email": fields.String,
        "active": fields.Boolean
    }),
}


class CustomerList(Resource):
    @marshal_with(customer_fields)
    @auth_required('token')
    @roles_required("admin")
    def get(self):
        customers= CustomerInfo.query.all()

        return customers

class CustomerAPI(Resource):
    @marshal_with(customer_fields)
    @auth_required('token')
    @roles_required('customer')
    def get(self,id):
        customer= CustomerInfo.query.filter_by(user_id= id).first()
        return customer
    def put(self,id):
        data= request.get_json()
        customer= CustomerInfo.query.filter_by(user_id= id).first()
        customer.name= data.get('name')
        customer.address= data.get('address')
        customer.pin_code= data.get('pin_code')
        customer.phone_no= data.get('phone_no')
        db.session.commit()
        return {"message": "Customer updated successfully"}

professional_fields={
    "id": fields.Integer,
    "user_id":fields.Integer,
    "name": fields.String,
    "address": fields.String,
    "experience": fields.String,
    "phone_no": fields.String,
    "service_name":fields.String,
    "pin_code": fields.Integer,
    "status": fields.String,
    "user": fields.Nested({
        "email": fields.String,
        "active": fields.Boolean
    }),
}

class ProfessionalList(Resource):
    @marshal_with(professional_fields)
    @auth_required('token')
    @roles_required('admin')
    def get(self):
        professionals= ProfessionalInfo.query.all()
        return professionals

class ProfessionalIDField(fields.Raw):
    def format(self, value):
        # Check if the value is None or not assigned
        if value is None:
            return "Not Assigned"
        return value  # Return the integer value if it exists

class ProfessionalAPI(Resource):
    @marshal_with(professional_fields)
    @auth_required('token')
    @roles_required('professional')
    def get(self,id):
        professional= ProfessionalInfo.query.filter_by(user_id =id).first()
        return professional
    def put(self,id):
        data= request.get_json()
        professional= ProfessionalInfo.query.filter_by(user_id = id).first()
        professional.name= data.get('name')
        professional.address= data.get('address')
        professional.experience= data.get('experience')
        professional.pin_code= data.get('pin_code')
        db.session.commit()
        return {"message": "Professional updated successfully"}

request_fields={
    "id": fields.Integer,
    "customer_id": fields.Integer,
    "professional_id":ProfessionalIDField(),
    "service_id": fields.Integer,
    "status": fields.String,
    "request_date": fields.DateTime,
    "completion_date":fields.DateTime,
    "rating": fields.Integer,
    "remarks": fields.String,
    "service2":fields.Nested({
        "name": fields.String,
        'price': fields.Integer,
        'time_required': fields.Integer,
        'description': fields.String
    }),
    "customer":fields.Nested({
        "user_id":fields.Integer,
        "name": fields.String,
        "address": fields.String,
        "pin_code":fields.Integer,
        "phone_no": fields.String,
        "user": fields.Nested({
            "email": fields.String,
            "active": fields.Boolean
    }),
    }),
    "professional":fields.Nested({
        "user_id":fields.Integer,
        "name": fields.String,
        "address": fields.String,
        "experience": fields.String,
        'phone_no': fields.Integer,
        "service_name":fields.String,
        "pin_code": fields.Integer,
        "status": fields.String,
        "user": fields.Nested({
            "email": fields.String,
            "active": fields.Boolean
        }),
    })

}  


class RequestList(Resource):
    @auth_required('token')
    @roles_required('admin')
    @cache.cached(timeout=5, key_prefix="request_list")
    @marshal_with(request_fields)
    def get(self):
        requests= Request.query.all()
        return requests      


@app.route('/book_request/<string:u_id>/<string:s_id>',methods=['POST'])
def create_request(s_id,u_id):
    customer= CustomerInfo.query.filter_by(user_id= u_id).first()
    service= Service.query.filter_by(id=s_id).first()
    new_request= Request(customer_id= customer.id,service_id= service.id)
    db.session.add(new_request)
    db.session.commit()
    return {"message": "Request created   successfully"}

@app.route('/service_history/<string:id>',methods=["GET","POST"])
@auth_required('token')
@roles_required('customer')
@marshal_with(request_fields)
def Req_history(id):
    customer= CustomerInfo.query.filter_by(user_id=id).first()
    requests= Request.query.filter_by(customer_id = customer.id).all()
    return requests

@auth_required('token')
@roles_required('professional')
@app.route('/prof_service/<string:u_id>',methods=["GET","POST"])
@marshal_with(request_fields)
def prof_offered_request(u_id):
    p1= ProfessionalInfo.query.filter_by(user_id=u_id).first()
    s1= Service.query.filter_by(description= p1.service_name).first()
    requests= Request.query.filter_by(service_id= s1.id,status='requested').all()
    rejected_id_list=p1.rejected_requests.split(',') if p1.rejected_requests else []
    offered_service=[]
    
    for request in requests:
        if str(request.id) not in rejected_id_list:
            offered_service.append(request)
              
    return offered_service

@auth_required('token')
@roles_required('professional')
@app.route('/prof_closed_request/<string:u_id>',methods=["GET","POST"])
@marshal_with(request_fields)
def prof_closed_request(u_id):
    p1= ProfessionalInfo.query.filter_by(user_id=u_id).first()
    requests= Request.query.filter_by(professional_id= p1.id,status='Completed').all()
    return requests

@auth_required('token')
@roles_required('professional')
@app.route('/prof_accepted_request/<string:u_id>',methods=["GET","POST"])
@marshal_with(request_fields)
def prof_accepted_request(u_id):
    p1= ProfessionalInfo.query.filter_by(user_id=u_id).first()
    requests= Request.query.filter_by(professional_id= p1.id,status='Assigned').all()
    return requests

@auth_required('token')
@roles_required('professional')
@app.route('/prof_rejected_request/<string:u_id>',methods=["GET","POST"]) 
@marshal_with(request_fields)
def rejectedRequest_by_prof(u_id):
    p1= ProfessionalInfo.query.filter_by(user_id= u_id).first()
    rejected_id_list=p1.rejected_requests.split(',') if p1.rejected_requests else []
    rejected_requests_object_list=[]
    if rejected_id_list:
        for r_id in rejected_id_list:
            request= Request.query.filter_by(id= r_id).first()
            rejected_requests_object_list.append(request)

    return rejected_requests_object_list 












# Add resources to the API
api.add_resource(RequestList,"/request_list")  
api.add_resource(ProfessionalList,'/professional_list') #displaying all  professionals
api.add_resource(CustomerList,'/customer_list') # displaying all list of customers 
api.add_resource(ServiceAPI, '/services/<int:service_id>') # dispalying and  editing and deleting a particular service
api.add_resource(ServiceListAPI, '/service_list') #displaying alll services and create a service
api.add_resource(CustomerAPI,'/customer/<int:id>')# displaying and editing the customer information
api.add_resource(ProfessionalAPI,'/professional/<int:id>')# displaying AND editing the professional informations