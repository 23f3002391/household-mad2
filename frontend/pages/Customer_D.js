import Service_Booking from "../components/Service_Booking.js";

export default {
  template: `
    <div id="app" class="container">
      <!-- Services Section -->
      <div class="services">
        <h3>Looking For?</h3>
        <div v-for="category in service_types" :key="category" class="category">
          <div>
            <button @click="toggleServiceBook(category)">
              {{ category }}
            </button>
          </div>
          <Service_Booking
            v-if="showServiceBook[category]"
            :category="category"  @book-request="book_request"
          />
        </div>
      </div>

      <!-- Profile Section -->
      <div class="profile">
        <router-link :to="'/edit_customer/' + $store.state.user_id">
          View/Edit Profile
        </router-link>
      </div>

      <!-- Service History Section -->
      <h3>Service History</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Service Name</th>
            <th>Service Description</th>
            <th>Professional Name</th>
            <th>Phone No.</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="request in request_list" :key="request.id">
            <td>{{ request.id }}</td>
            <td>{{ request.service1.name }}</td>
            <td>{{ request.service1.description }}</td>
            <td>{{ request.professional.full_name }}</td>
            <td>{{ request.professional.phone_no }}</td>
            <td>{{ request.status }}</td>
            <td v-if="request.status === 'Completed'">
              <button class="btn btn-primary">Close it</button>
            </td>
            <td v-else>Request is ongoing</td>
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
    }
  },
  mounted() {
    this.typeList();
    this.service_history();
  },
};
