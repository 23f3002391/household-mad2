export default {
    template: `
    <div>
        <input placeholder="email" v-model="email" />
        <input placeholder="password" type="password" v-model="password" />
        <button class='btn btn-primary' @click="submitLogin">Login</button>
    </div>
    `,
    data() {
        return {
            email: null,
            password: null,
        };
    },
    methods: {
        async submitLogin() {
            const res = await fetch(location.origin + '/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: this.email, password: this.password }),
            });
            if (res.ok) {
                const data = await res.json();
                console.log('Login successful:', data);
                
                // Save token to localStorage
                localStorage.setItem('user', JSON.stringify(data) );
                this.$store.commit('setUser');
                if (data.role=== "admin"){
                    this.$router.push("/admin_d")
                    alert("Login successfull",data)
                } else if ( data.role==="customer"){
                    this.$router.push("/customer_d")
                    alert("Login successfull",data)
                } else{
                    this.$router.push("/professional_d")
                    alert("Login successfull",data)
                }

            } else {
                const error = await res.json();
                alert(`Error: ${error.message}`);
            }
        },
    },
};