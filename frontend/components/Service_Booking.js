export default {
    props: ["category"],
    template: `
      <div class="services">
        <h3>Best {{ category }} Package</h3>
        <table>
          <thead>
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
              <td>{{ service.name }}</td>
              <td>{{ service.description }}</td>
              <td>{{ service.time_required }}</td>
              <td>{{ service.price }}</td>
              <td>
                <button class="close-btn" @click="$emit('book-request', service.id)">
                  Book
                </button>
              </td>
            </tr>
          </tbody>
        </table>
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
  