export default {
    template:`
   <div id="app" class="container">
        <h2>Search Services</h2>

        <label for="searchType">Search By:</label>
        <select v-model="selectedCategory" id="searchType">
            <option value="name">Service Name</option>
            <option value="location">Location</option>
            <option value="pin_code">Pin Code</option>
        </select>

        <input type="text" v-model="searchQuery" :placeholder="'Search by ' + selectedCategory">
        <button @click="search">Search</button>


        <table v-if="selectedCategory==='name'"  style="width: 100%; border-collapse: collapse; text-align: left; margin-bottom: 20px;">
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
            <tbody v-if = "services.length > 0">
                <tr v-for="service in services" :key="service.id" style="border: 1px solid #ddd; background-color: #fff;" >
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ service.id }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ service.name }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ service.description }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ service.time_required }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ service.price }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
                        <button class="close-btn" @click="book_request('service.id')"
                        style="background-color: #007bff; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer;"
                        >
                            Book
                        </button>
                    </td>
                </tr>
            </tbody>
            <div v-else> No services found </div>
        </table>
        <table v-if="selectedCategory==='location'"   style="width: 100%; border-collapse: collapse; text-align: left; margin-bottom: 20px;">
            <thead>
                <tr style="background-color: #f4f4f4; color: #333;">
                    <th style="border: 1px solid #ddd; padding: 10px;">ID</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Service Name</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Description</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Professional Name</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Experience</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Address</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Time Required</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Base Price</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Action</th>
                </tr>
            </thead>
            <tbody v-if = "services.length > 0">
                <tr v-for="professional in services" :key="service.id" style="border: 1px solid #ddd; background-color: #fff;" >
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.service1.id }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.service1.name }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.service1.description }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.name }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.experience }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.address }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.service1.time_required }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.service1.price }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
                        <button class="close-btn" @click="book_request(professional.service1.id)"
                        style="background-color: #007bff; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer;"
                        >
                            Book
                        </button>
                    </td>
                </tr>
            </tbody>
            <div v-else> No services found </div>
        </table>
        <table v-if="selectedCategory==='pin_code'"   style="width: 100%; border-collapse: collapse; text-align: left; margin-bottom: 20px;">
            <thead>
                <tr style="background-color: #f4f4f4; color: #333;">
                    <th style="border: 1px solid #ddd; padding: 10px;">ID</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Service Name</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Description</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Professional Name</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Experience</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Pin-Code</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Time Required</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Base Price</th>
                    <th style="border: 1px solid #ddd; padding: 10px;">Action</th>
                </tr>
            </thead>
            <tbody v-if = "services.length > 0">
                <tr v-for="professional in services" :key="professional.service1.id" style="border: 1px solid #ddd; background-color: #fff;" >
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.service1.id }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.service1.name }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.service1.description }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.name }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.experience }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.pin_code }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.service1.time_required }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">{{ professional.service1.price }}</td>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">
                        <button class="close-btn" @click="book_request(professional.service1.id)"
                        style="background-color: #007bff; color: white; border: none; padding: 8px 12px; border-radius: 5px; cursor: pointer;"
                        >
                            Book
                        </button>
                    </td>
                </tr>
            </tbody>
            <div v-else> No services found </div>
        </table>
        
    </div>

    `,
    data(){
        return{
            services:[],
            selectedCategory:'categories',
            searchQuery:''
        }
    },
    methods:{
        async search(){
            const res = await fetch(location.origin + `/c_search/${this.selectedCategory}/${this.searchQuery}`, {
                method: "GET",
                headers: {
                    "Authentication-Token": this.$store.state.auth_token,
                },
            });
            if (res.ok){
                const data = await res.json();
                this.services = data
            } else{
                const errorText = await res.text(); // Fetch response body as text for more context
                console.error(`Error: ${res.status} - ${errorText}`);
            }
            
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
            this.$router.push('/customer_d')
            
          } else {
            const errorText = await res.text();
            console.error(`Error: ${res.status} - ${errorText}`);
          }
        }
    }
}