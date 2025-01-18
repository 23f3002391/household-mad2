export default{
    template:`
    <div class="popup-overlay" >
      <div class="popup-container">
        <h2>Create Service</h2>
        <form @submit.prevent="createService">
          <label for="serviceName">Service Name:</label>
          <input type="text"  v-model="name" id="serviceName" required /><br/>

          <label for="serviceDescription"> Service Description:</label>
          <textarea v-model="description" id="serviceDescription" required></textarea><br/>

          <label for="time_required">Time required(in hours):</label>
          <input type="number"  id="Time"  v-model="time_required" required><br/>
    
          <label for="base_price">Base Price:</label>
          <input type="number"  id="base_price"  v-model="price" required><br/>

          <button type="submit">Create</button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </form>
      </div>
  </div>
    `,
    data(){
        return{
            name:null,
            description:null,
            time_required:null,
            price:null,
        }
    },
    methods:{
        createService(){
            const newService={
                name:this.name,
                description:this.description,
                time_required:this.time_required,
                price: this.price
            }
            this.$emit('service-created', newService)
            this.$emit('close')
            
        }
    }
    
}