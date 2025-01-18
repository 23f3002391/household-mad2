export default{
    props: ['id', 'name', 'time', 'price', 'description'],
    template:`
    <div class="popup-overlay" >
      <div class="popup-container">
        <h2>Edit Service</h2>
        <form @submit.prevent="editService">
          <label for="serviceName">Service Name:</label>
          <input type="text"   id="serviceName" v-model="name"  disabled/><br/>

          <label for="serviceDescription"> Service Description:</label>
          <textarea v-model="description" id="serviceDescription"   required></textarea><br/>

          <label for="time_required">Time required(in hours):</label>
          <input type="number"  id="Time"  v-model="time_required"  required><br/>
    
          <label for="base_price">Base Price:</label>
          <input type="number"  id="base_price"  v-model="price"  required><br/>

          <button type="submit">Save Changes</button>
          <button type="button" @click="$emit('close')">Cancel</button>
        </form>
      </div>
  </div>
    `,
    data(){
        return{
            name: this.name,
            description:this.description,
            time_required:this.time,
            price: this.price,
        }
    },
    methods:{
        editService(){
            const editService={
                id: this.id,
                name: this.name,
                description:this.description,
                time_required:this.time_required,
                price: this.price
            }
            this.$emit('service-edited', editService,this.id)
            this.$emit('close')
            
        }
    }
    
}