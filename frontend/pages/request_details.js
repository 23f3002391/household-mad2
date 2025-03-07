export default{
    props:['request'],
    template:`
    <div :style="overlayStyle">
    <div :style="modalStyle">
      <h2 :style="headerStyle">Service Remarks</h2>
      <p>Request ID: {{ request.id }}</p>

      <form @submit.prevent="submitRemarks">
        <label>Service Name:</label>
        <input type="text" :value="request.service2.name" readonly :style="inputStyle" />

        <label>Description:</label>
        <input type="text" :value="request.service2.description" readonly :style="inputStyle" />

        <label>Date of Request:</label>
        <input type="text" :value="request.request_date" readonly :style="inputStyle" />

        <label>Date of Completion:</label>
        <input type="text" :value="request.completion_date" readonly :style="inputStyle" />

        <label>Professional ID:</label>
        <input type="text" :value="request.professional_id" readonly :style="inputStyle" />

        <label>Professional Name:</label>
        <input type="text" :value="request.professional.name" readonly :style="inputStyle" />

        <label>Contact No.:</label>
        <input type="text" :value="request.professional.phone_no" readonly :style="inputStyle" />

        <!-- Rating Section -->
        <label>Service Rating:</label>
        <div :style="ratingContainerStyle"  >
          <span v-for="star in 5" :key="star"  :style="starStyle(star)">
            ★
          </span>
        </div>

        <label>Remarks (if any):</label>
        <textarea v-model="request.remarks" rows="3" :style="textareaStyle" readonly ></textarea>

        <div :style="buttonContainerStyle">
          <button type="button" @click="closePopup" :style="closeButtonStyle">Close</button>
        </div>
      </form>
    </div>
    </div>
    `,
    data(){
        return{
        
            
        }
    },
    computed: {
    // Inline styles for elements
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
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        };
      },
      headerStyle() {
        return {
          textAlign: "center",
          marginBottom: "12px",
        };
      },
      inputStyle() {
        return {
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          backgroundColor: "#f5f5f5",
        };
      },
      textareaStyle() {
        return {
          width: "100%",
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        };
      },
      ratingContainerStyle() {
        return {
          display: "flex",
          gap: "5px",
          marginBottom: "10px",
        };
      },
      buttonContainerStyle() {
        return {
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        };
      },
      submitButtonStyle() {
        return {
          backgroundColor: "#28a745",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        };
      },
      closeButtonStyle() {
        return {
          backgroundColor: "#dc3545",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        };
      },
    },
    methods:{
        
        closePopup() {
            this.$emit("close",this.request.id); // Close the popup via parent
          },
        starStyle(star) {
            return {
              cursor: "pointer",
              fontSize: "24px",
              color: star <= this.request.rating ? "#FFD700" : "#ccc",
              marginRight: "5px",
            };
        },
    }
}    