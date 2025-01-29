import Service_Booking from "../components/Service_Booking.js";

export default {
  template: `<div id="app" class="container" style="font-family: Arial, sans-serif; margin: 20px;">
  <!-- Services Section -->
  <div class="services" style="margin-bottom: 20px;">
    <h3 style="color: #333; text-align: center; margin-bottom: 10px;">Looking For?</h3>
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
    <router-link
      :to="'/edit_customer/' + $store.state.user_id"
      style="color: #007bff; text-decoration: none; font-size: 16px;"
    >
      View/Edit Profile
    </router-link>
  </div>

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
        <td style="border: 1px solid #ddd; padding: 8px;" v-if="request.status=='Assigned' " >{{ request.professional.name }}</td>
        <td style="border: 1px solid #ddd; padding: 8px;" v-else >Profesisonal not assigned</td>
        <td style="border: 1px solid #ddd; padding: 8px;" v-if="request.status=='Assigned' " >{{ request.professional.phone_no }}</td>
        <td style="border: 1px solid #ddd; padding: 8px;" v-else>Profesisonal not assigned</td>
        <td style="border: 1px solid #ddd; padding: 8px;">{{ request.status }}</td>
        <td style="border: 1px solid #ddd; padding: 8px;">{{ request.service2.name }}</td>
        <td
          v-if="request.status === 'Completed'"
          style="border: 1px solid #ddd; padding: 8px;"
        >
          <button
            class="btn btn-primary"
            style="background-color: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;"
          >
            Close it
          </button>
        </td>
        <td v-else style="border: 1px solid #ddd; padding: 8px;">
          Request is ongoing
        </td>
      </tr>
    </tbody>
  </table>
</div>
`,
  data() {
    return {
      service_types: [],
      request_list: [],
      showServiceBook: {}, // Store visibility states for categories
    };
  },
  components: {
    Service_Booking,
  },
  methods: {
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
        window.location.reload()
        
      } else {
        const errorText = await res.text();
        console.error(`Error: ${res.status} - ${errorText}`);
      }
    },

  },
  mounted() {
    this.typeList();
    this.service_history();
  },
};
