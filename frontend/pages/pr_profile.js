export default{
  props:['id'],
    template:`
    <div :style="overlayStyle">
    <div :style="modalStyle">
      <h2 :style="headerStyle">Profile</h2>
      <p>Professional ID: {{ id }}</p>
      <form @submit.prevent="submitProfile">
        <label> Name:</label>
        <input type="text" v-model="name" :style="inputStyle" />
        <label>Email:</label>
        <input type="email" v-model="email" :style="inputStyle" readonly />
        <label>Service Description:</label>
        <input type="text" v-model="service_name" :style="inputStyle" readonly />
        <label>Phone No.:</label>
        <input type="text" v-model="phone_no" :style="inputStyle" />
        <label>Experience:</label>
        <input type="text" v-model="experience" :style="inputStyle" />
        <label>Pin Code:</label>
        <input type="text" v-model="pin_code" :style="inputStyle" />
        <label>Address:</label>
        <textarea v-model="address" rows="3" :style="textareaStyle"></textarea>
        <div :style="buttonContainerStyle">
          <button type="submit" :style="submitButtonStyle">Submit</button>
          <button type="button" @click="$emit('close')" :style="submitButtonStyle">Close</button>
        </div>
      </form>
    </div>
    `,
    data(){
        return{
            name:null,
            address:null,
            phone_no:null,
            experience:null,
            email:null,
            pin_code:null,
            service_name:null
        }
            
    },
    computed:{
      
        // Inline styles for elements
        // overlayStyle() {
        //   return {
        //       position: "fixed",
        //       top: "50%",
        //       left: "50%",
        //       transform: "translate(-50%, -50%)",
        //       backgroundColor: "rgba(0,0,0,0.7)",
        //       zIndex: 1000,
        //       display: "block",
        //       width: "100%",
        //       height: "100%"
        //   };
        // },
        overlayStyle() {
          return {
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "45%",  // Adjusted for better fit
              maxHeight: "80vh", // Limits height so buttons stay visible
              backgroundColor: "white",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
              overflowY: "auto", // Enables scrolling if needed
          };
      },
        modalStyle() {
          return {
              position: "relative",
              width: "50%",
              margin: "auto",
              padding: "1rem",
              backgroundColor: "white",
              borderRadius: "10px"
          };
        },
        headerStyle() {
          return {
              textAlign: "center",
              color: "#333"
          };
        },
        inputStyle() {
          return {
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc"
          };
        },
        textareaStyle() {
          return {
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid #ccc"
          };
        },
        buttonContainerStyle() {
          return {
              textAlign: "center"
          };
        },
        submitButtonStyle() {
          return {
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight: "10px"
          };
        }
      
    },
    methods:{
      async get_professional(){
        const res= await fetch(location.origin + `/api/professional/${this.id}` ,
          { method:"GET",
            headers:{'Authentication-Token' : this.$store.state.auth_token}

        })
        if(res.ok){
          const data= await res.json()
          this.name= data.name
          this.address= data.address
          this.phone_no= data.phone_no
          this.email= data.user.email
          this.experience= data.experience
          this.pin_code= data.pin_code
          this.service_name= data.service_name
        } else{
          const errorText = await res.text(); // Fetch response body as text for more context
          console.error(`Error: ${res.status} - ${errorText}`);
        }
      },
      async submitProfile(){
        
        const res= await fetch(location.origin + `/api/professional/${this.id}` ,
          { method:"PUT",
            headers:{'Content-Type': 'application/json',
            'Authentication-Token' : this.$store.state.auth_token},
            body:JSON.stringify({name:this.name, address:this.address, phone_no:this.phone_no,experience:this.experience, pin_code:this.pin_code})
        })
        if(res.ok){
          console.log('Profile updated')
          this.$emit('close')
        } else{
          const errorText = await res.text(); // Fetch response body as text for more context
          console.error(`Error: ${res.status} - ${errorText}`);
        }
      },
    },
    mounted(){
      this.get_professional()
    }

}