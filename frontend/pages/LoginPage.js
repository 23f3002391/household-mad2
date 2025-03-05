export default {
    template: `
    <div class="container d-flex justify-content-center align-items-center vh-100" style="background-color:rgb(144, 245, 100);">
        <div class="card p-4 shadow-lg border-0" style="max-width: 500px; width: 100%; border-radius: 12px;">
            <h2 class="text-center mb-3 text-primary">Login</h2>
            
            <form @submit.prevent="submitLogin">
                <!-- Email Input -->
                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" v-model="email" class="form-control" placeholder="Enter your email" required>
                </div>

                <!-- Password Input -->
                <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" v-model="password" class="form-control" placeholder="Enter your password" required>
                </div>

                <!-- Error Message -->
                <div v-if="errorMessage" class="alert alert-danger p-2 text-center">
                    {{ errorMessage }}
                </div>

                <!-- Login Button -->
                <button type="submit" class="btn btn-primary w-100">Login</button>

                <!-- Register Link -->
                <div class="text-center mt-3">
                    <small>Don't have an account? <router-link to="/register" class="text-decoration-none text-primary">Sign Up</router-link></small>
                </div>
            </form>
        </div>
    </div>
    `,
    data() {
        return {
            email: null,
            password: null,
            errorMessage: null
        };
    },
    methods: {
        async submitLogin() {
            this.errorMessage = null; // Reset previous errors

            try {
                const res = await fetch(location.origin + '/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: this.email, password: this.password }),
                });

                if (res.ok) {
                    const data = await res.json();
                    console.log('Login successful:', data);
                    
                    // Save token to localStorage
                    localStorage.setItem('user', JSON.stringify(data));
                    this.$store.commit('setUser');

                    // Redirect based on role
                    if (data.role === "admin") {
                        this.$router.push("/admin_d");
                    } else if (data.role === "customer") {
                        this.$router.push("/customer_d");
                    } else {
                        this.$router.push("/professional_d");
                    }

                    alert("Login successful!");
                } else {
                    const error = await res.json();
                    this.errorMessage = error.message || "Login failed. Please try again.";
                }
            } catch (err) {
                this.errorMessage = "An error occurred. Please check your connection.";
            }
        },
    },
};
