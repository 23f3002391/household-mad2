export default {
  template: `
    <div class="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4 shadow-lg text-white flex items-center justify-between">
      <!-- Left: Logo -->
      <router-link to="/" class="text-2xl font-bold hover:text-yellow-300 transition duration-300">
        🏠 Home Services
      </router-link>

      <!-- Center: Navigation Links -->
      <div class="space-x-4">
        <router-link v-if="!$store.state.loggedIn" to="/login" :class="navLinkClass('/login')">Login</router-link>
        <router-link v-if="!$store.state.loggedIn" to="/register" :class="navLinkClass('/register')">Register</router-link>

        <!-- Admin Links -->
        <router-link v-if="$store.state.loggedIn && $store.state.role === 'admin'" to="/admin_d" :class="navLinkClass('/admin_d')">Admin Dash</router-link>
        <router-link v-if="$store.state.loggedIn && $store.state.role === 'admin'" to="/admin_search" :class="navLinkClass('/admin_search')">Search</router-link>
        <router-link v-if="$store.state.loggedIn && $store.state.role === 'admin'" to="/admin_summary" :class="navLinkClass('/admin_summary')">Summary</router-link>

        <!-- Customer Links -->
        <router-link v-if="$store.state.loggedIn && $store.state.role === 'customer'" to="/c_search" :class="navLinkClass('/c_search')">Search</router-link>
        <router-link v-if="$store.state.loggedIn && $store.state.role === 'customer'" to="/customer_d" :class="navLinkClass('/customer_d')">Customer Dash</router-link>

        <!-- Professional Links -->
        <router-link v-if="$store.state.loggedIn && $store.state.role === 'professional'" to="/professional_d" :class="navLinkClass('/professional_d')">Professional Dashboard</router-link>
      </div>

      <!-- Right: Logout Button -->
      <button v-if="$store.state.loggedIn" @click="logout" class="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg shadow-md transition duration-300">
        Logout 🚪
      </button>
    </div>
  `,
  computed: {
    // Function to check active route and apply styles
    navLinkClass() {
      return (path) => 
        this.$route.path === path 
          ? "px-4 py-2 bg-blue text-black rounded-lg shadow-md transition duration-300" 
          : "px-4 py-2 hover:bg-black hover:text-black rounded-lg transition duration-300";
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/");
    }
  }
};
