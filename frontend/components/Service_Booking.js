export default {
    props: ["category"],
    template: `
      <div class="services" style="font-family: Arial, sans-serif; margin: 20px;">
  <h3 style="color: #333; text-align: center; margin-bottom: 15px;">
    Best {{ category }} Package
  </h3>
  <table
    style="width: 100%; border-collapse: collapse; text-align: left; margin-bottom: 20px;"
  >
    <thead>
      <tr style="background-color: #f4f4f4; color: #333;">
        <th style="border: 1px solid #ddd; padding: 10px;">ID</th>
        <th style="border: 1px solid #ddd; padding: 10px;">Service Name</th>
        <th style="border: 1px solid #ddd; padding: 10px;">Description</th>
        <th style="border: 1px solid #ddd; padding: 10px;">Time Required</th>
        <th style="border: 1px solid #ddd; padding: 10px;">Base Price</th>
        <th style="border: 1px solid #ddd; padding: 10px;">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="service in services"
        :key="service.id"
        style="border: 1px solid #ddd; background-color: #fff;"
      >
        <td style="border: 1px solid #ddd; padding: 10px;">{{ service.id }}</td>
        <td style="border: 1px solid #ddd; padding: 10px;">{{ service.name }}</td>
        <td style="border: 1px solid #ddd; padding: 10px;">{{ service.description }}</td>
        <td style="border: 1px solid #ddd; padding: 10px;">{{ service.time_required }}</td>
        <td style="border: 1px solid #ddd; padding: 10px;">{{ service.price }}</td>
        <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
          <button
            class="close-btn"
            @click="$emit('book-request', service.id)"
            style="background-color: #007bff; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer;"
          >
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
  