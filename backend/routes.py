from flask import current_app as app, jsonify, render_template, request ,send_file
from flask_security import auth_required, verify_password, hash_password, current_user,roles_required
from backend.models import *
import traceback
from backend.celery.tasks import create_csv
from celery.result import AsyncResult

datastore = app.security.datastore
@app.get("/")
def home():
    return render_template('index.html')

@auth_required('token') 
@app.get('/get-csv/<id>')
def getCSV(id):
    result = AsyncResult(id)

    if result.ready():
        return send_file(f'./backend/celery/user-downloads/{result.result}'), 200
    else:
        return {'message' : 'task not ready'}, 405

@auth_required('token') 
@app.get('/create-csv')
def createCSV():
    task = create_csv.delay()
    return {'task_id' : task.id}, 200

@app.get("/protected")
@auth_required('token')
def protected():
    return "<h1> only accessible by auth user</h1/>"

@app.route('/login', methods = ['POST'])
def login():

    data = request.get_json()

    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({"message" : "invalid inputs"}), 404
    
    user = datastore.find_user(email = email)

    if not user:
        return jsonify({"message" : "invalid email"}), 404
    
    if verify_password(password, user.password):
        return jsonify({'token' : user.get_auth_token(), 'email' : user.email, 'role' : user.roles[0].name, 'id' : user.id})
    
    return jsonify({"message": "invalid password"}), 400

@app.route('/customerRegister', methods = ['POST'])
def customerRegister():

    data = request.get_json()
    email = data.get('email')  
    password = data.get('password')
    name= data.get("name")
    phone_no= data.get("phone_no")
    address= data.get("address")
    pin_code= data.get("pin_code")

    role = "customer"
    

    if not email or not password:
        return jsonify({"message" : "invalid inputs"}), 404
    
    user = datastore.find_user(email = email)

    if user:
        return jsonify({"message" : "user already exists"}), 404
    
    try:
        datastore.create_user(email= email, password = hash_password(password), roles = [role], active = True)
        db.session.commit()

        user = datastore.find_user(email = email)

        new_customer= CustomerInfo(user_id= user.id, name=name, address=address,pin_code= pin_code,phone_no= phone_no)
        db.session.add(new_customer)
        db.session.commit()
        return jsonify({"message" : "user created"}), 200
    except:
        db.session.rollback()
        return jsonify({"message" : "error creating user"}), 400

@app.route('/profRegister', methods=['POST'])
def professionalRegister():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')
    name=data.get("name")
    s_name = data.get('service_name')
    address = data.get("address")
    phone_no=data.get("phone_no")
    pin_code = data.get("pin_code")
    experience= data.get("experience")

    role = "professional"

    if not email or not password:
        return jsonify({"message": "Invalid inputs"}), 404

    user = datastore.find_user(email=email)

    if user:
        return jsonify({"message": "User already exists"}), 404

    try:
        # Step 1: Create user in the datastore
        datastore.create_user(email=email, password=hash_password(password), roles=[role], active=True)
        db.session.commit()

        # Step 2: Retrieve the user
        user = datastore.find_user(email=email)
        s= Service.query.filter_by(description = s_name).first()
        # Step 3: Create ProfessionalInfo instance
        new_professional = ProfessionalInfo(
            user_id=user.id,
            name=name,
            address=address,
            pin_code=pin_code,
            phone_no=phone_no,
            service_name=s_name,
            experience= experience,
            service_id= s.id
        )

        # Step 4: Add and commit the ProfessionalInfo instance
        db.session.add(new_professional)
        db.session.commit()

        # Step 5: Return a success response
        return jsonify({"message": "User created"}), 200
    except Exception as e:
        db.session.rollback()
        print(traceback.format_exc())  # Log the full stack trace
        return jsonify({"message": "Error creating user", "error": str(e)}), 400
    

@auth_required('token')
@roles_required('admin')
@app.route('/prof/<string:professionaId>/<string:status>',methods=["GET"])
def professional_approval(professionaId,status):
    p1=ProfessionalInfo.query.get(professionaId)
    p1.status= status
    db.session.commit() 
    return {"message": "Professional status updated successfully", "status": status}
@auth_required('token')
@roles_required('admin')
@app.route('/profBlock/<string:status>/<string:professionaId>',methods=["GET"])
def professional_block_status(professionaId,status):
    p1=ProfessionalInfo.query.get(professionaId)
    u1=User.query.get(p1.user.id)
    if status== 'block':
        u1.active= False
        db.session.commit() 
        return {"message": "Professional block status updated successfully", "status": status}
    else:
        u1.active= True
        db.session.commit() 
        return {"message": "Professional block status updated successfully", "status": status}    

@auth_required('token')
@roles_required('admin')
@app.route('/customBlock/<string:status>/<string:c_id>',methods=["GET"])
def customer_block_status(c_id,status):
    c1= CustomerInfo.query.get(c_id)
    u1=User.query.get(c1.user.id)
    if status== 'block':
        u1.active= False
        db.session.commit() 
        return {"message": "Professional block status updated successfully", "status": status}
    else:
        u1.active= True
        db.session.commit() 
        return {"message": "Professional block status updated successfully", "status": status}      

@auth_required('token')
@roles_required('customer')
@app.route("/category_list",methods=["GET"])
def service_categories():
    categories= Service.query.all()
    a= set()
    for category in categories:
        a.add(category.name.strip()) 
    return list(a) 

# @app.route("/service_list/<string:category>",methods=["GET"])    
# def s_list(category):
#     services= Service.query.filter_by(name=category).all()
#     return services

@app.route('/prof_request_status/<string:u_id>/<string:req_id>/<string:status>',methods=["GET","POST"])
def professional_request_status(u_id,req_id,status):
    p1= ProfessionalInfo.query.filter_by(user_id= u_id).first()
    r1= Request.query.filter_by(id= req_id).first()
    if status=="Accept":
        r1.status="Assigned"
        r1.professional_id= p1.id
        db.session.commit()
        return {"message": "profesional request status got updated"}
    elif status=="Reject":
        if p1.rejected_requests:
            p1.rejected_requests += f",{r1.id}"
        else:
            p1.rejected_requests= str(r1.id)
        db.session.commit()
        return {"message": "profesional request status got updated"}

   





@app.route('/dropdown/all_services',methods=["GET","POST"])
def dropdown_s():
    services= Service.query.all()
    d_list=[]
    for service in services:
        d_list.append(service.description)
    return d_list


@app.route('/admin_search/<string:role>/<string:pname>', methods=['GET'])
def admin_search(role, pname):
    if role == "customer":
        c1 = CustomerInfo.query.filter_by(name=pname).first()  # FIXED
        if not c1:
            return {"error": "Customer not found"}, 404  # FIXED
        
        return {
            'id': c1.id,
            'email': c1.user.email,
            'user_id': c1.user.id,
            'name': c1.name,
            'address': c1.address,
            'pin_code': c1.pin_code,
            'active': c1.user.active   
        }
    
    else:
        p1 = ProfessionalInfo.query.filter_by(status=pname).first()  # FIXED
        if not p1:
            return {"error": "Professional not found"}, 404  # FIXED
        
        return {
            'id': p1.id,
            'email': p1.user.email,
            'user_id': p1.user.id,
            'name': p1.name,
            'address': p1.address,
            'pin_code': p1.pin_code, 
            'experience': p1.experience,
            'service_name': p1.service_name,
            'status': p1.status,
            'active': p1.user.active 
        }

@app.route('/c_search/<string:category>/<string:query>', methods=['GET'])
def custom_search(category,query):
    if category == "name":
        services= Service.query.filter_by(name= query).all()
        return jsonify([service.to_dict() for service in services])

        
    elif category == "location":
        prof= ProfessionalInfo.query.filter_by(address= query).all()
        if prof is None:
            return {"message": "No professional found"}
        return jsonify([p.to_dict() for p in prof])
    elif category == "pin_code":
        prof= ProfessionalInfo.query.filter_by(pin_code= query).all()
        if prof is None:
            return {"message": "No professional found"}
        return jsonify([p.to_dict() for p in prof])


