export default{
    props: ['id', 'name', 'time', 'price', 'description'],
    template:`
    <div class="popup_overlay d-flex align-items-center justify-content-center" :style="popup_overlay">
    <div class="popup-container bg-white p-4 rounded shadow-lg" :style="popup_container">
      <h2 class="text-center mb-4">Edit Service</h2>
      <form @submit.prevent="editService">
        <div class="mb-3">
          <label for="serviceName" class="form-label">Service Name:</label>
          <input type="text" class="form-control" v-model="name" id="serviceName" disabled />
        </div>

        <div class="mb-3">
          <label for="serviceDescription" class="form-label">Service Description:</label>
          <textarea class="form-control" v-model="description" id="serviceDescription" rows="3" required></textarea>
        </div>

        <div class="mb-3">
          <label for="timeRequired" class="form-label">Time required (in hours):</label>
          <input type="number" class="form-control" id="timeRequired" v-model="time_required" required />
        </div>

        <div class="mb-3">
          <label for="basePrice" class="form-label">Base Price:</label>
          <input type="number" class="form-control" id="basePrice" v-model="price" required />
        </div>

        <div class="d-flex justify-content-between">
          <button type="submit" class="btn btn-primary">Create</button>
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
        </div>
      </form>
    </div>
    </div>
    `,
    computed:{
        popup_overlay(){
            return{
                position:'fixed',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: '1000'
            }
        },
        popup_container(){    
            return{
                width: '500px',
                padding: '20px',
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
            }
        },
        
    },

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