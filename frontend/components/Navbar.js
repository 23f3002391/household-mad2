export default {
    template :`
        <div>
            <router-link to="/" >Home</router-link>
            <router-link v-if=!$store.state.loggedIn to="/login" >Login</router-link>
            <router-link v-if=!$store.state.loggedIn to="/register" >Register</router-link>
            <router-link v-if="$store.state.loggedIn && $store.state.role == 'admin'" to='/admin_d'>Admin Dash</router-link>
            <router-link v-if="$store.state.loggedIn && $store.state.role == 'customer'" to='/customer_d'>Customer Dash</router-link>
            <router-link v-if="$store.state.loggedIn && $store.state.role == 'professional'" to='/professional_d'>Professional dashboard</router-link>


            <button class="btn btn-secondary" v-if="$store.state.loggedIn" @click=logout >Logout</button>

        </div>
        `,
        methods:{
            logout() {
                // Commit the logout mutation to clear Vuex state
                this.$store.commit('logout');
                
                // Redirect to the home page after logging out
                this.$router.push('/');
              }
        } 
        
            
}