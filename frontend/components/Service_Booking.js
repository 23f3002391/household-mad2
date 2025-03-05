export default {
    props: ["category"],
    template: `
      <div class="p-6 font-sans bg-gray-100 min-h-screen">
    <!-- Title -->
    <h3 class="text-2xl font-bold text-gray-800 text-center mb-6">
      Best {{ category }} Package
    </h3>

    <!-- Responsive Table -->
    <div class="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <th class="th-style">ID</th>
            <th class="th-style">Service Name</th>
            <th class="th-style">Description</th>
            <th class="th-style">Time Required</th>
            <th class="th-style">Base Price</th>
            <th class="th-style">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="service in services"
            :key="service.id"
            class="hover:bg-blue-50 transition duration-200"
          >
            <td class="td-style">{{ service.id }}</td>
            <td class="td-style font-semibold text-blue-600">{{ service.name }}</td>
            <td class="td-style">{{ service.description }}</td>
            <td class="td-style">{{ service.time_required }} mins</td>
            <td class="td-style text-green-600 font-bold">₹{{ service.price }}</td>
            <td class="td-style text-center">
              <button
                @click="$emit('book-request', service.id)"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg shadow-md transition duration-300"
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
  