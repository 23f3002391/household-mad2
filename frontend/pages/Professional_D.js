export default{
    template: `
  <div class="services-container" style="font-family: Arial, sans-serif; margin: 20px;">

    <!-- Today's Services Section -->
    <h3 class="section-title" style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">Today's Services</h3>
    <table class="table table-striped" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead style="background-color: #007bff; color: white;">
            <tr>
                <th style="padding: 10px; border: 1px solid #ddd;">ID</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Customer Name</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Contact No</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Location</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Date of Requested</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Date of Completion</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Rating</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Status</th>
                <th style="padding: 10px; border: 1px solid #ddd;">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="request in services" :key="request.id">
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.id }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.customer.name }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.customer.phone_no }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.customer.address }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.request_date }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.completion_date }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.rating }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.status }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">
                    <button @click="acceptRequest(request.id)" class="btn btn-success" 
                            style="background-color:#28a745; color:white; padding:5px 10px; border:none; cursor:pointer;">Accept</button> ||
                    <button @click="rejectRequest(request.id)" class="btn btn-primary" 
                            style="background-color:#007bff; color:white; padding:5px 10px; border:none; cursor:pointer;">Reject</button>
                </td>
            </tr>
        </tbody>
    </table>

    <!-- Accepted Services Section -->
    <h3 class="section-title" style="color:#333; border-bottom:2px solid #28a745; padding-bottom:10px;">Accepted Services</h3>
    <table class="table table-striped" style="width:100%; border-collapse:collapse; margin-bottom:20px;">
        <thead style="background-color:#28a745; color:white;">
            <tr>
                <th style="padding:10px; border:1px solid #ddd;">ID</th>
                <th style="padding:10px; border:1px solid #ddd;">Customer Name</th>
                <th style="padding:10px; border:1px solid #ddd;">Contact No</th>
                <th style="padding:10px; border:1px solid #ddd;">Location</th>
                <th style="padding:10px; border:1px solid #ddd;">Date of Requested</th>
                <th style="padding:10px; border:1px solid #ddd;">Date of Completion</th>
                <th style="padding:10px; border:1px solid #ddd;">Rating</th>
                <th style="padding:10px; border:1px solid #ddd;">Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="request in accepted_Request" :key="request.id">
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.id }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.customer.name }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.customer.phone_no }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.customer.address }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.request_date }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.completion_date }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.rating }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.status }}</td>
            </tr >
        </tbody >
    </table >

    <!-- Rejected Services Section -->
    <h3 class="section-title" style="color:#333; border-bottom :2 px solid #dc3545;padding-bottom :10px;">Rejected Services</h3 >
    <table class = "table table-striped"style = "width :100% ;border-collapse :collapse;margin-bottom :20 px ;">
        <thead style = "background-color:#dc3545;color:white;">
            <tr>
                <th style =" padding :10 px ;border :1 px solid #dddddd ;">ID</th>
                <th style =" padding :10 px ;border :1 px solid #dddddd ;">Customer Name</th>
                <th style =" padding :10 px ;border :1 px solid #dddddd ;">Contact No</th>
                <th style =" padding :10 px ;border :1 px solid #dddddd ;">Location</th>
                <th style =" padding :10 px ;border :1 px solid #dddddd ;">Date of Requested</th>
                <th style =" padding :10 px ;border :1 px solid #dddddd ;">Date of Completion</th>
                <th style =" padding :10 px ;border :1 px solid #dddddd ;">Rating</th>
                <th style =" padding :10 px ;border :1 px solid #dddddd ;">Status</th>
            </tr>
        </thead>
        <tbody >
          <tr v-for = "request in rejected_Request":key = "request.id">

                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.id }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.customer.name }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.customer.phone_no }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.customer.address }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.request_date }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.completion_date }}</td>
                <td style="padding: 8px; border: 1px solid #ddd;">{{ request.rating }}</td>
                <td style =" padding :8 px ;border :1 px solid #ddd;">Rejected</td>

          </tr>
        </tbody >
    </table >

    <!-- Closed Services Section -->
    <h3 class = "section-title"style = "color:#333;border-bottom:2px solid #dc3545;padding-bottom:10px;">
        Closed Services
    </h3>
    <table class="table table-striped" style="width:100%; border-collapse:collapse; margin-bottom:20px;">
        <thead style="background-color:#28a745; color:white;">
            <tr>
                <th style="padding:10px;border:1px solid #ddd;">ID</th>
                <th style="padding:10px;border:1px solid #ddd;">Customer Name</th>
                <th style="padding:10px;border:1px solid #ddd;">Contact No</th>
                <th style="padding:10px;border:1px solid #ddd;">Location</th>
                <th style="padding:10px;border:1px solid #ddd;">Date of Requested</th>
                <th style="padding:10px;border:1px solid #ddd;">Date of Completion</th>
                <th style="padding:10px;border:1px solid #ddd;">Rating</th>
                <th style="padding:10px;border:1px solid #ddd;">Status</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="request in closedServices" :key="request.id">
                <td style="padding:8px;border:1px solid #ddd;">{{ request.id }}</td>
                <td style="padding:8px;border:1px solid #ddd;">{{ request.customer.full_name }}</td>
                <td style="padding:8px;border:1px solid #ddd;" >{{ request.customer.phone_no }}</td>
                <td style="padding:8px;border:1px solid #ddd;" >{{ request.customer.address }}</td>
                <td style="padding:8px;border:1px solid #ddd;" >{{ request.date_of_request }}</td>
                <td style="padding:8px;border:1px solid #ddd;" >{{ request.date_of_completion }}</td>
                <td style="padding:8px;border:1px solid #ddd;" >{{ request.rating }}</td>
                <td style="padding:8px;border:1px solid #ddd;" >{{ request.status }}</td>
            </tr>
        </tbody >
    </table >

  </div>


    `,
    data(){
        return{
            services:[],
            closedServices:[],
            rejected_Request:[],
            accepted_Request:[]

        }
    },
    methods:{
        async offeredService(){
            const res= await fetch(location.origin + `/prof_service/${this.$store.state.user_id}`,
                {
                method:"GET",
                headers:{
                  "Authetication-Token":this.$store.state.auth_token
                }
                },

            )
            if (res.ok){
              this.services= await res.json()
              console.log('offered services listed')

            } else {
              const errorText = await res.text();
              console.error(`Error: ${res.status} - ${errorText}`);
            }
        },
        async serviceHistory(){
          const res= await fetch(location.origin + `/prof_closed_request/${this.$store.state.user_id}`,
            {
              method:"GET",
              headers:{
                "Authetication-Token":this.$store.state.auth_token
              }
            }
          )
          if (res.ok){
            this.closedServices = await res.json()
            console.log('closed services listed')
          } else {
            const errorText = await res.text();
            console.error(`Error: ${res.status} - ${errorText}`);
          }

        },
        async acceptRequest(req_id){
          const status='Accept'
          const res= await fetch(location.origin +`/prof_request_status/${this.$store.state.user_id}/${req_id}/${status}`,
            {
              method:"GET",
              headers:{
                "Authetication-Token":this.$store.state.auth_token
              }
            }     
          )
          if (res.ok){
            this.offeredService()
            this.acceptedRequest()
            console.log('request got accepted')
          } else {
            const errorText = await res.text();
            console.error(`Error: ${res.status} - ${errorText}`);
          }

        },
        async rejectRequest(req_id){
          const status='Reject'
          const res= await fetch(location.origin +`/prof_request_status/${this.$store.state.user_id}/${req_id}/${status}`,
            {
              method:"GET",
              headers:{
                "Authetication-Token":this.$store.state.auth_token
              }
            }     
          )
          if (res.ok){
            this.offeredService()
            this.rejectedRequest()
            console.log('request got rejected')
          } else {
            const errorText = await res.text();
            console.error(`Error: ${res.status} - ${errorText}`);
          }

        },
        async acceptedRequest(){
          const res= await fetch(location.origin + `/prof_accepted_request/${this.$store.state.user_id}`,
            {
              method:"GET",
              headers:{
                "Authetication-Token":this.$store.state.auth_token
              }
            }
          )
          if (res.ok){
            this.accepted_Request= await res.json()
            console.log('Accepted request listed')
            
          } else {
            const errorText = await res.text();
            console.error(`Error: ${res.status} - ${errorText}`);
          }

        },
        async rejectedRequest(){
          const res= await fetch(location.origin + `/prof_rejected_request/${this.$store.state.user_id}`,
            {
              method:"GET",
              headers:{
                "Authetication-Token":this.$store.state.auth_token
              }
            }
          )
          if (res.ok){
            this.rejected_Request= await res.json()
            console.log('Rejected request listed')
            console.log(this.rejected_Request)
          } else {
            const errorText = await res.text();
            console.error(`Error: ${res.status} - ${errorText}`);
          }

        },

    },
    mounted(){
      this.offeredService()
      this.acceptedRequest()
      this.rejectedRequest()
      this.serviceHistory()
    }
}
