export default{
    template:`
    <div class="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Search Services</h2>

        <div class="flex flex-col sm:flex-row gap-4 mb-4">
            <div class="flex items-center gap-2">
                <label for="searchType" class="text-gray-600 font-medium">Search By:</label>
                <select v-model="role" id="searchType" class="border p-2 rounded-md focus:ring focus:ring-blue-300">
                    <option value="customer">Customer</option>
                    <option value="professional">Professional</option>
                </select>
            </div>

            <input type="text" v-model="searchQuery" :placeholder="'Search by ' + role + ' name'"
                class="border p-2 flex-1 rounded-md focus:ring focus:ring-blue-300" />
            <button @click="search"
                class="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-md shadow-md transition duration-300"
>
                Search
            </button>
        </div>

        <div v-if="client && Object.keys(client).length > 0" class="overflow-x-auto">
            <table class="w-full border border-gray-300 shadow-sm">
                <thead>
                    <tr class="bg-gray-100 text-gray-700">
                        <th class="border p-3">User ID</th>
                        <th class="border p-3">Name</th>
                        <th class="border p-3">Email</th>
                        <th v-if="role==='professional'" class="border p-3">Service Name</th>
                        <th class="border p-3">Address</th>
                        <th class="border p-3" v-if="role==='professional'" >Phone No.</th>
                        <th class="border p-3">Pin Code</th>
                        <th class="border p-3">Status</th>
                        <th class="border p-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="bg-white hover:bg-gray-50 transition">
                        <td class="border p-3">{{ client.id }}</td>
                        <td class="border p-3">{{ client.name }}</td>
                        <td class="border p-3">{{ client.email }}</td>
                        <td v-if="role==='professional'" class="border p-3">
                            {{ client.service_name || 'Service not available' }}
                        </td>
                        <td class="border p-3">{{ client.address }}</td>
                        <td class="border p-3" v-if="role==='professional'" >{{ client.phone_no }}</td>
                        <td class="border p-3">{{ client.pin_code }}</td>
                        <td class="border p-3 font-semibold" :class="client.active ? 'text-green-600' : 'text-red-600'">
                            {{ client.active ? 'Active' : 'Blocked' }}
                        </td>
                        <td class="border p-3 text-center">
                            <button v-if="role==='customer' && client.active" 
                                @click="blockCustomer(client.id)"
                                class="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-md shadow-md transition duration-300"
>
                                Block
                            </button>
                            <button v-if="role==='customer' && !client.active"
                                @click="unblockCustomer(client.id)"
                                class="bg-blue-500 hover:bg-blue-600 text-black px-3 py-1 rounded-md">
                                Unblock
                            </button>
                            <button v-if="role==='professional' && client.active"
                                @click="blockProfessional(client.id)"
                                class="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-4 py-2 rounded-md shadow-md transition duration-300"
>
                                Block
                            </button>
                            <button v-if="role==='professional' && !client.active"
                                @click="unblockProfessional(client.id)"
                                class="bg-blue-500 hover:bg-blue-600 text-black px-3 py-1 rounded-md">
                                Unblock
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data(){
        return{
            client:null,
            role:null,
            searchQuery:'',
            
        }
    },
    methods:{
        async search(){
            const res = await fetch(location.origin + `/admin_search/${this.role}/${this.searchQuery}`, {
                method: "GET",
                headers: {
                    "Authentication-Token": this.$store.state.auth_token,
                },
            })
            if (res.ok) {
                const data = await res.json();
                this.client = data
                console.log(data)
                
            }else{
                const errorText = await res.text(); // Fetch response body as text for more context
                console.error(`Error: ${res.status} - ${errorText}`);
            }
        },
        async blockProfessional(professionalId) {
            const status= 'block'
            const res= await fetch(location.origin +`/profBlock/${status}/${professionalId}`,
                {
                    method:"GET",
                    headers:{"Authentication-Token":this.$store.state.auth_token}
                }
            )
            if (res.ok){
                this.proflist()
                console.log('professional got blocked')
            } else{
                const errorText = await res.text(); // Fetch response body as text for more context
                console.error(`Error: ${res.status} - ${errorText}`);
            }
        },

        async unblockProfessional(professionalId) {
            const status= 'unblock'
            const res= await fetch(location.origin +`/profBlock/${status}/${professionalId}`,
                {
                    method:"GET",
                    headers:{"Authentication-Token":this.$store.state.auth_token}
                }
            )
            if (res.ok){
                this.proflist()
                console.log('professional got unblocked')
            } else{
                const errorText = await res.text(); // Fetch response body as text for more context
                console.error(`Error: ${res.status} - ${errorText}`);
            }
        },
        async blockCustomer(c_id) {
            const status= 'block'
            const res= await fetch(location.origin +`/customBlock/${status}/${c_id}`,
                {
                    method:"GET",
                    headers:{"Authentication-Token":this.$store.state.auth_token}
                }
            )
            if (res.ok){
                this.customerlist()
                console.log('customer got blocked')
            } else{
                const errorText = await res.text(); // Fetch response body as text for more context
                console.error(`Error: ${res.status} - ${errorText}`);
            }
        },
        async unblockCustomer(c_id) {
            const status= 'unblock'
            const res= await fetch(location.origin +`/customBlock/${status}/${c_id}`,
                {
                    method:"GET",
                    headers:{"Authentication-Token":this.$store.state.auth_token}
                }
            )
            if (res.ok){
                this.customerlist()
                console.log('customer got unblocked')
            } else{
                const errorText = await res.text(); // Fetch response body as text for more context
                console.error(`Error: ${res.status} - ${errorText}`);
            }
        },
        
    }

}