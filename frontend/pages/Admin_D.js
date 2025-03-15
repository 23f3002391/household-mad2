import CreateService from "./CreateService.js";
import EditService from "./EditService.js";

export default {
    
    template: `<div class="container my-4">
    <!-- Page Header -->
    <div class="text-center mb-4">
        <h1 class="display-4">Admin Dashboard</h1>
        <p class="text-muted">Manage services, professionals, customers, and service requests efficiently.</p>
    </div>

    <!-- Services Section -->
    <section class="mb-5">
     <button btn-button-success @click="create_csv"> Get User Data CSV </button>
        <h3 class="section-title text-primary border-bottom pb-2">Services</h3>
        <div class="table-responsive">
            <table class="table table-striped table-hover align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Service Name</th>
                        <th>Base Price</th>
                        <th>Description</th>
                        <th>Time Required</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="service in services" :key="service.id">
                        <td>{{ service.id }}</td>
                        <td>{{ service.name }}</td>
                        <td>{{ service.price }}</td>
                        <td>{{ service.description }}</td>
                        <td>{{ service.time_required }}</td>
                        <td>
                            <button class="btn btn-sm btn-primary" @click= "showPopup1=true">Edit</button>
                            <EditService v-if="showPopup1" :id= service.id :name= service.name :price=service.price :time= service.time_required :description= service.description  @close="showPopup1 = false"  @service-edited="handleServiceEdited" />
                            <button class="btn btn-sm btn-danger" @click= "deleteService(service.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <button @click="showPopup = true">Create Service</button>
        <CreateService v-if="showPopup"  @close="showPopup = false"  @service-created="handleServiceCreated" />
       
    </section>

    <!-- Professionals Section -->
    <section class="mb-5">
        <h3 class="section-title text-success border-bottom pb-2">Professionals</h3>
        <div class="table-responsive">
            <table class="table table-striped table-hover align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Service Description</th>
                        <th>Experience (Yrs)</th>
                        <th>Status</th>
                        <th>Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="professional in professionals" :key="professional.id">
                        <td>{{ professional.id }}</td>
                        <td> {{ professional.user.email }}</td>
                        <td>{{ professional.name }}</td>
                        <td>{{ professional.service_name }}</td>
                        <td>{{ professional.experience }}</td>
                        <td v-if="professional.user.active">{{ professional.status }}</td>
                        <td v-else>Blocked</td>
                        <td> 
                            <button v-if="professional.status==='Pending' "  @click = "approveProfessional(professional.id,'Approved')" class="btn btn-success" > Approve </button>
                            <button v-if="professional.status==='Pending' " @click = "approveProfessional(professional.id,'Rejected')" class="btn btn-danger" > Reject </button>
                            <button v-if="professional.status==='Approved' && professional.user.active" @click= "blockProfessional(professional.id)"  class="btn btn-warning" > Block </button>
                            <button v-if="professional.status==='Blocked' && !professional.user.active" @click="unblockProfessional(professional.id)"  class="btn btn-primary" > Unblock </button>
                        
                        </td>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <!-- Customer Section -->
    <section class="mb-5">
        <h3 class="section-title text-info border-bottom pb-2">Active Customers</h3>
        <div class="table-responsive">
            <table class="table table-striped table-hover align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone-No</th>
                        <th>Address</th>
                        <th>Pin-Code</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="customer in customers" :key="customer.id">
                        <td>{{ customer.id }}</td>
                        <td>{{ customer.name }}</td>
                        <td>{{ customer.user.email }}</td>
                        <td>{{ customer.phone_no }}</td>
                        <td>{{ customer.address }}</td>
                        <td>{{ customer.pin_code }}</td>
                        <td v-if="customer.user.active">Active</td>
                        <td v-else>Inactive</td>
                        <td>
                        <button v-if="customer.user.active" @click= "blockCustomer(customer.id)"  class="btn btn-warning" > Block </button>
                        <button v-if="!customer.user.active" @click="unblockCustomer(customer.id)"  class="btn btn-primary" > Unblock </button>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <!-- Service Requests Section -->
    <section class="mb-5">
        <h3 class="section-title text-warning border-bottom pb-2">Service Requests</h3>
        <div class="table-responsive">
            <table class="table table-striped table-hover align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Assigned Professional</th>
                        <th>Service Type</th>
                        <th>Service Description</th>
                        <th>Service Price</th>
                        <th>Customer Name</th>
                        <th>Location</th>
                        <th>Date of Request</th>
                        <th>Date of Completion</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="request in requests" :key="request.id">
                        <td> {{ request.id }} </td>
                        <td> {{ request.professional.name || 'Unassigned' }} </td>
                        <td>{{ request.service2.name }}</td>
                        <td>{{ request.service2.description }}</td>
                        <td>{{ request.service2.price }}</td>
                        <td>{{ request.customer.name }}</td>
                        <td>{{ request.customer.address }}</td>
                        <td>{{ request.request_date }}</td>
                        <td>{{ request.completion_date || 'Pending' }} </td>
                        <td>{{ request.status }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</div>
`,
    data(){
        return{
            professionals:[],
            customers:[],
            services:[],
            requests:[],
            showPopup: false,
            showPopup1: false
        }
    },
    components:{
        CreateService,
        EditService,
    },

    methods: {
        async create_csv(){
            const res = await fetch(location.origin + '/create-csv', {
                headers : {
                    'Authentication-Token' : this.$store.state.auth_token
                }
            })
            const task_id = (await res.json()).task_id

            const interval = setInterval(async() => {
                const res = await fetch(`${location.origin}/get-csv/${task_id}` )
                if (res.ok){
                    console.log('data is ready')
                    window.open(`${location.origin}/get-csv/${task_id}`)
                    clearInterval(interval)
                }

            }, 100)
            
        },
        
        async customerlist(){
            const res= await fetch(location.origin +"/api/customer_list",
               {methods: "GET",
                headers: {'Authentication-Token' : this.$store.state.auth_token}
               } 
            )

            if (res.ok){
                console.log("customers list is ready")
                this.customers= await res.json()

            } else {
                console.error("Failed to fetch customer list:", res.statusText)
            }
        
            
        },
        async proflist(){
            const res= await fetch(location.origin +"/api/professional_list",
               {methods: "GET",
                headers: {'Authentication-Token' : this.$store.state.auth_token}
               } 
            )

            if (res.ok){
                console.log("professionals list is ready")
                this.professionals= await res.json()

            } else {
            const errorText = await res.text(); // Fetch response body as text for more context
            console.error(`Error: ${res.status} - ${errorText}`);
            }
        },
        async serviceList(){
            const res= await fetch(location.origin +"/api/service_list",
                {methods: "GET",
                 headers: {'Authentication-Token' : this.$store.state.auth_token}
                } 
            )
 
             if (res.ok){

                console.log(" service list is ready" )
                this.services = await res.json()
 
            } else {
            const errorText = await res.text(); // Fetch response body as text for more context
            console.error(`Error: ${res.status} - ${errorText}`);
            }
        },

        async reqList(){
            const res= await fetch(location.origin +"/api/request_list",
                {methods: "GET",
                 headers: {'Authentication-Token' : this.$store.state.auth_token}
                } 
            )
 
             if (res.ok){

                console.log("request list is ready")
                this.requests = await res.json()
 
            } else {
                const errorText = await res.text(); // Fetch response body as text for more context
                console.error(`Error: ${res.status} - ${errorText}`);
            }
        },

        async handleServiceCreated(newService){
            const res =  await fetch(location.origin+"/api/service_list",
                {method:"POST",
                 headers:{'Authentication-Token': this.$store.state.auth_token,
                'Content-Type': 'application/json' },
                 body: JSON.stringify(newService)
                }) 
            if (res.ok){
                this.serviceList()
                console.log('service created')
            } else {
                const errorText = await res.text(); // Fetch response body as text for more context
                console.error(`Error: ${res.status} - ${errorText}`);
            }
                
            }, 

        async handleServiceEdited(editedService) {
            this.showpopup1= true
            const res= await fetch(location.origin +`/api/services/${editedService.id }`,
                {
                    method: "PUT",
                    headers:{'Authentication-Token': this.$store.state.auth_token
                    ,'Content-Type': 'application/json'},
                    body: JSON.stringify(editedService)

                        
                }
            )
            if (res.ok){
                this.serviceList()
                
            } else{
                alert('response error')
                const errorText = await res.text();// Fetch response body as text for more context
                console.error(`Error: ${res.status} - ${errorText}`)
            }
            
        },

        async deleteService(serviceId) {
            const res=  await fetch(location.origin + `/api/services/${serviceId}`,
                {method:"DELETE",
                 headers:{"Authentication-Token":this.$store.state.auth_token},
                }
            )
            if (res.ok){
                this.serviceList()
                console.log('service deleted')
            } else{
                const errorText = await res.text(); // Fetch response body as text for more context
                console.error(`Error: ${res.status} - ${errorText}`);
            }

        },

        async approveProfessional(professionalId,status) {
            const res= await fetch(location.origin + `/prof/${professionalId}/${status}`,
                {
                    method:"GET",
                    headers:{"Authentication-Token":this.$store.state.auth_token}
                }
            ) 
            if (res.ok){
                this.proflist()
                console.log('professional status got changed')
            } else{
                const errorText = await res.text(); // Fetch response body as text for more context
                console.error(`Error: ${res.status} - ${errorText}`);
            }
        },

         async blockProfessional(professionalId) {
            const status= 'block'
            const res= await fetch(location.origin +`/profBlock/${status}/${professionalId}`,
                {
                    method:"GET",
                    headers:{"Authentication-Token":this.$store.state.auth_token}
                }
            )
            if (res.ok){
                this.proflist()
                console.log('professional got blocked')
            } else{
                const errorText = await res.text(); // Fetch response body as text for more context
                console.error(`Error: ${res.status} - ${errorText}`);
            }
        },

        async unblockProfessional(professionalId) {
            const status= 'unblock'
            const res= await fetch(location.origin +`/profBlock/${status}/${professionalId}`,
                {
                    method:"GET",
                    headers:{"Authentication-Token":this.$store.state.auth_token}
                }
            )
            if (res.ok){
                this.proflist()
                console.log('professional got unblocked')
            } else{
                const errorText = await res.text(); // Fetch response body as text for more context
                console.error(`Error: ${res.status} - ${errorText}`);
            }
        },
        async blockCustomer(c_id) {
            const status= 'block'
            const res= await fetch(location.origin +`/customBlock/${status}/${c_id}`,
                {
                    method:"GET",
                    headers:{"Authentication-Token":this.$store.state.auth_token}
                }
            )
            if (res.ok){
                this.customerlist()
                console.log('customer got blocked')
            } else{
                const errorText = await res.text(); // Fetch response body as text for more context
                console.error(`Error: ${res.status} - ${errorText}`);
            }
        },
        async unblockCustomer(c_id) {
            const status= 'unblock'
            const res= await fetch(location.origin +`/customBlock/${status}/${c_id}`,
                {
                    method:"GET",
                    headers:{"Authentication-Token":this.$store.state.auth_token}
                }
            )
            if (res.ok){
                this.customerlist()
                console.log('customer got unblocked')
            } else{
                const errorText = await res.text(); // Fetch response body as text for more context
                console.error(`Error: ${res.status} - ${errorText}`);
            }
        },
    },

    mounted(){
        this.customerlist(),
        this.proflist(),
        this.serviceList(),
        this.reqList()
    }
    
};
