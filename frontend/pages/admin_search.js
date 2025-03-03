export default{
    template:`
    <div class="container">
        <h2>Search Services</h2>

        <label for="searchType">Search By:</label>
        <select v-model="role" id="searchType">
            <option value="customer">Customer</option>
            <option value="profesisonal">Professional</option>
            
        </select>

        <input type="text" v-model="searchQuery" :placeholder="'Search by ' + selectedCategory + ' name'">
        <button @click="search">Search</button>
        <table  style="width: 100%; border-collapse: collapse; text-align: left; margin-bottom: 20px;">
            <tr style="background-color: #f4f4f4; color: #333;">
                <th style="border: 1px solid #ddd; padding: 10px;">User ID</th>
                <th style="border: 1px solid #ddd; padding: 10px;">Name</th>
                <th style="border: 1px solid #ddd; padding: 10px;">Email</th>
                <th v-if="role==='professional'" style="border: 1px solid #ddd; padding: 10px;">Service Name</th>
                <th style="border: 1px solid #ddd; padding: 10px;">Address</th>
                <th style="border: 1px solid #ddd; padding: 10px;">Phone No.</th>
                <th style="border: 1px solid #ddd; padding: 10px;">Pin Code</th>
                <th style="border: 1px solid #ddd; padding: 10px;">Status</th>
                <th style="border: 1px solid #ddd; padding: 10px;">Action</th>
            </tr>
            <tr v-for="user in users" :key="user.id" style="border: 1px solid #ddd; background-color: #fff;">
                <td style="border: 1px solid #ddd; padding: 10px;">{{ client.id }}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">{{ client.name }}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">{{ client.email }}</td>
                <td v-if="role==='professional'" style="border: 1px solid #ddd; padding: 10px;">{{ client.service_name || 'service not exist' }}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">{{ client.address }}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">{{ client.phone_no }}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">{{ client.pin_code }}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">{{ client.user.active ? 'Active' : 'Blocked' }}</td>
                <td v-if="role==='customer'" style="border: 1px solid #ddd; padding: 10px; text-align: center;">
                    <button v-if="client.user.active" @click= "blockCustomer(client.id)"  class="btn btn-warning" > Block </button>
                    <button v-if="!client.user.active" @click="unblockCustomer(client.id)"  class="btn btn-primary" > Unblock </button>
                       
                </td> 
                <td v-if="role==='professional'" style="border: 1px solid #ddd; padding: 10px; text-align: center;">
                    <button v-if="client.user.active" @click= "blockProfessional(client.id)"  class="btn btn-warning" > Block </button>
                    <button v-if="!client.user.active" @click="unblockProfessional(client.id)"  class="btn btn-primary" > Unblock </button>
                </td>       
    </div>
    `,
    data(){
        return{
            client:[],
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