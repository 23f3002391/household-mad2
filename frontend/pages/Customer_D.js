import Service_Booking from "../components/Service_Booking.js";
import service_remarks from "./service_remarks.js";
import request_details from "./request_details.js";
import edit_remarks from "./edit_remarks.js";
import c_profile from "../pages/c_profile.js";

export default {
  template: `
  <div id="app" class="container" style="font-family: Arial, sans-serif; margin: 20px;" v-if="status=='Active'" > 
  <!-- Services Section -->
  <div class="services" style="margin-bottom: 20px;">
    <h3 style="color: #333; text-align: center; margin-bottom: 10px;"> Looking For? </h3>
    <div
      v-for="category in service_types"
      :key="category"
      class="category"
      style="margin-bottom: 10px;"
    >
      <div>
        <button
          @click="toggleServiceBook(category)"
          style="background-color: #007bff; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;"
        >
          {{ category }}
        </button>
      </div>
      <Service_Booking
        v-if="showServiceBook[category]"
        :category="category"
        @book-request="book_request"
      />
    </div>
  </div>

  <!-- Profile Section -->
  <div class="profile" style="margin-bottom: 20px; text-align: center;">
    <button
      style="background-color: #007bff; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;"
      @click="profilePopup=true"
    >
      View Profile
    </button>
  </div>
  <c_profile v-if='profilePopup' :id= '$store.state.user_id' @close='closeProfile' />
  <!-- Service History Section -->
  <h3 style="color: #333; text-align: center; margin-bottom: 10px;">Service History</h3>
  <table
    style="width: 100%; border-collapse: collapse; text-align: left; margin-bottom: 20px;"
  >
    <thead>
      <tr style="background-color: #f4f4f4;">
        <th style="border: 1px solid #ddd; padding: 8px;">ID</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Date of request</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Service Description</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Professional Name</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Professional Contact</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Status</th>
        <th style="border: 1px solid #ddd; padding: 8px;">service name</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="request in request_list"
        :key="request.id"
        style="border: 1px solid #ddd;"
      >
        <td style="border: 1px solid #ddd; padding: 8px;">{{ request.id }}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">{{ request.request_date }}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">{{ request.service2.description }}</td>
        <td style="border: 1px solid #ddd; padding: 8px;" v-if="request.status=='requested' " >Profesisonal not assigned</td>
        <td style="border: 1px solid #ddd; padding: 8px;" v-else >{{ request.professional.name }}</td>
        <td style="border: 1px solid #ddd; padding: 8px;" v-if="request.status=='requested' " >Profesisonal not assigned</td>
        <td style="border: 1px solid #ddd; padding: 8px;" v-else >{{ request.professional.phone_no }} </td>
        <td style="border: 1px solid #ddd; padding: 8px;">{{ request.status }}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">{{ request.service2.name }}</td>
        <td v-if="request.status === 'Assigned'" style="border: 1px solid #ddd; padding: 8px;">
          <button
            class="btn btn-primary"
            style="background-color:rgb(0, 255, 30); color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;"
            @click="toggleEditRequest(request.id)"
          >
            Edit Request
          </button> ||
          <button
            class="btn btn-primary"
            style="background-color:rgb(255, 0, 0); color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;"
            @click="togglerequest1(request.id)"
          >
            Close it
          </button>
        </td>
        <td v-else-if="request.status === 'Completed'" style="border: 1px solid #ddd; padding: 8px;">
          <button
            class="btn btn-primary"
            style="background-color: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;"
            @click="togglerequest2(request.id)"
          >
            View Request Details
          </button>
        </td>
        <td v-else style="border: 1px solid #ddd; padding: 8px;">
          Request is ongoing
        </td>
        <request_details v-if="viewRequestPopup[request.id]" :request="request"  @close="togglerequest2" />
        <edit_remarks v-if="editRequestPopup[request.id]" :request="request" @submit='editRequest'  @close="toggleEditRequest" />
        <service_remarks v-if="closeRequestPopup[request.id]" :request="request" @submit="close_request"  @close="togglerequest1" />
      </tr>
      
    </tbody>
  </table>
</div>
<div v-else-if="status=='Blocked'" >
  <h1 style="color:blue" > Your account  has been blocked by our admins </h1>
</div>
`,
  data() {
    return {
      service_types: [],
      request_list: [],
      showServiceBook: {},
      editRequestPopup:{} ,
      closeRequestPopup:{},
      viewRequestPopup:{},
      profilePopup:false,
      status:null
      // Store visibility states for categories
    };
  },
  components: {
    Service_Booking,
    service_remarks,
    request_details,
    edit_remarks,
    c_profile
  },
  methods: {
    closeProfile(){
      this.profilePopup=false;
    },
    async checkStatus(){
      const res= await fetch(location.origin+`/customer_status/${this.$store.state.user_id}`,
      {method:"GET",
        headers:{
          "Authentication-Token": this.$store.state.auth_token,
          "Content-Type":'application/json'
          
        }
      })
      if (res.ok){
        this.data= await res.json()
        this.status= this.data.status
        console.log("Status checked",this.status)
      }else{
        const errorText = await res.text();
        console.error(`Error: ${res.status} - ${errorText}`)
      }
    }, 

    async typeList() {
      const res = await fetch(location.origin + `/category_list`, {
        method: "GET",
        headers: {
          "Authentication-Token": this.$store.state.auth_token,
        },
      });
      if (res.ok) {
        console.log("Categories listed");
        this.service_types = await res.json();
      } else {
        const errorText = await res.text();
        console.error(`Error: ${res.status} - ${errorText}`);
      }
    },
    async service_history() {
      const res = await fetch(location.origin + `/service_history/${this.$store.state.user_id}`, {
        method: "GET",
        headers: {
          "Authentication-Token": this.$store.state.auth_token,
        },
      });
      if (res.ok) {
        console.log("Service history listed");
        this.request_list = await res.json();
        
      } else {
        const errorText = await res.text();
        console.error(`Error: ${res.status} - ${errorText}`);
      }
    },
    toggleServiceBook(category) {
      // Toggle the visibility of Service_Booking for a specific category
      this.$set(
        this.showServiceBook,
        category,
        !this.showServiceBook[category]
      );
    },
    togglerequest1(id) {
      // Toggle the visibility of request_details for a specific request
      this.$set(
        this.closeRequestPopup,
        id,
        !this.closeRequestPopup[id]
      );
    },
    togglerequest2(id) {
      // Toggle the visibility of request_details for a specific request
      this.$set(
        this.viewRequestPopup,
        id,
        !this.viewRequestPopup[id]
      );
    },
    toggleEditRequest(id) {
      // Toggle the visibility of request_details for a specific request
      this.$set(
        this.editRequestPopup,
        id,
        !this.editRequestPopup[id]
      );
    }
    ,
    
    async book_request(s_id){
       const res= await fetch(location.origin+`/book_request/${this.$store.state.user_id}/${s_id}`,
        {method:"POST",
          headers:{
            "Authentication-Token": this.$store.state.auth_token,
            "Content-Type":'application/json'
          },
          
          
        }
       )

       if (res.ok) {
        alert('Service Request is created')
        console.log("Service request is created");
        this.service_history()
        
      } else {
        const errorText = await res.text();
        console.error(`Error: ${res.status} - ${errorText}`);
      }
    },
    async close_request(data){
      const res= await fetch(location.origin+`/close_request`,
      {method:"POST",
        headers:{
          "Authentication-Token": this.$store.state.auth_token,
          "Content-Type":'application/json'
          
        },
        body:JSON.stringify(data)
      })
      if (res.ok){
        console.log("Request is closed")
        this.service_history()
      }else{
        const errorText = await res.text();
        console.error(`Error: ${res.status} - ${errorText}`)
      }
    },
    async editRequest(data){
      const res= await fetch(location.origin+`/close_request`,
      {method:"PUT",
        headers:{
          "Authentication-Token": this.$store.state.auth_token,
          "Content-Type":'application/json'
          
        },
        body:JSON.stringify(data)
      })
      if (res.ok){
        console.log(res)
        console.log("Request is edited");
        this.service_history()
      }else{
        const errorText = await res.text();
        console.error(`Error: ${res.status} - ${errorText}`);}
    }  
  },
  mounted() {
    this.typeList();
    this.service_history();
    this.checkStatus();
  },
}
