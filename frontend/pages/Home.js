export default {
  template: `
  <div class="relative min-h-screen bg-cover bg-center" style="background-image: url('/static/pages/images/home-bg.png');">
    <!-- Overlay for better readability -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <!-- Hero Section -->
    <div class="relative z-10 text-center text-white py-20">
      <h1 class="text-4xl md:text-6xl font-bold drop-shadow-lg" :style="{color:'black'}">Premium Household Services</h1>
      <p class="mt-4 text-lg md:text-xl drop-shadow-md" :style="{color:'black'}">Find the best professionals for your home needs.</p>
      
    </div>

    <!-- Services Section -->
    <div class="relative z-10 max-w-6xl mx-auto px-4 py-12">
      <h2 :style="{color:'black'}" class="text-3xl font-bold text-black text-center mb-8">Our Services</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="service in services" :key="service.id" class="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center transform transition duration-300 hover:shadow-xl hover:scale-105">
          <img :src="service.image" alt="Service Icon" class="w-16 h-16 object-contain mb-4">
          <h3 class="text-lg font-semibold">{{ service.name }}</h3>
          <p class="text-gray-600 mt-2">{{ service.description }}</p>
          <span :style="{color:'blue'}" class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
            Book Now
          </span>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      services: [
        { id: 1, name: "Electrical Services", description: "Get your electrical problems fixed by professionals.", image: "/static/pages/images/electrical.png" },
        { id: 2, name: "Plumbing Services", description: "Find the best plumbers in your area.", image: "/static/pages/images/plumbing.png" },
        { id: 3, name: "Cleaning Services", description: "Book professional cleaners for your home.", image: "/static/pages/images/cleaning.png" },
        { id: 4, name: "Salon Services", description: "Get salon services at your home.", image: "/static/pages/images/salon.png" },
        { id: 5, name: "Appliance Repair", description: "Repair your home appliances with ease.", image: "/static/pages/images/appliance.png" },
        { id: 6, name: "Painting Services", description: "Hire professional painters for your home.", image: "/static/pages/images/painting.png" }
      ]
    };
  }
};


