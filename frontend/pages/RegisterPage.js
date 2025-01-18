export default {
    template: `
    <div>
        Role:
        <select v-model="role">
            <option value="" disabled>--Select role--</option>
            <option value="professional">Professional</option>
            <option value="customer">Customer</option>
        </select>
        
        <button class='btn btn-primary' @click="showRegister">Register</button>
    </div>
    `,
    
    data() {
        return {
            role: "", // Default role set to an empty string
        };
    },

    watch:{
        role(newRole) {
            if (newRole === "customer") {
                this.$router.push("/customReg");
            } else if (newRole === "professional") {
                this.$router.push("/profReg");
            } 
            
        }
    }
};
