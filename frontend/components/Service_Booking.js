export default {
    props: ["category"],
    template: `
      <div class="container py-4 bg-light min-vh-50">
    <!-- Title -->
    <h3 class="text-center fw-bold text-dark mb-4">
      Best {{ category }} Package
    </h3>

    <!-- Responsive Table -->
    <div class="table-responsive bg-white shadow-lg rounded p-3">
      <table class="table table-bordered text-center">
        <thead class="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Service Name</th>
            <th>Description</th>
            <th>Time Required</th>
            <th>Base Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in services" :key="service.id">
            <td>{{ service.id }}</td>
            <td class="fw-semibold text-primary">{{ service.name }}</td>
            <td>{{ service.description }}</td>
            <td>{{ service.time_required }} hour</td>
            <td class="fw-bold text-success">₹{{ service.price }}</td>
            <td>
              <button
                @click="$emit('book-request', service.id)"
                class="btn btn-primary"
              >
                Book 📅
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

    `,
    data() {
      return {
        services: [],
      };
    },
    methods: {
      async service_list() {
        const res = await fetch(location.origin + `/service_list/${this.category}`, {
          method: "GET",
          headers: {
            "Authentication-Token": this.$store.state.auth_token,
          },
        });
  
        if (res.ok) {
          console.log("Services opened");
          this.services = await res.json();
        } else {
          const errorText = await res.text();
          console.error(`Error: ${res.status} - ${errorText}`);
        }
      },
      

    },
    mounted() {
      this.service_list();
    },
  };
  