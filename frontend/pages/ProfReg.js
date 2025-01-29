export default {
    template: `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f8f9fa;">
        <div style="max-width: 400px; width: 100%; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
            <h2 style="text-align: center; margin-bottom: 20px;">Professional Registration</h2>
            <div class="form-group" style="margin-bottom: 15px;">
                <input 
                    placeholder="Email" 
                    v-model="email" 
                    class="form-control" 
                    style="width: 100%; padding: 10px; font-size: 1rem;" 
                />
            </div>
            <div class="form-group" style="margin-bottom: 15px;">
                <input 
                    placeholder="Password" 
                    type="password" 
                    v-model="password" 
                    class="form-control" 
                    style="width: 100%; padding: 10px; font-size: 1rem;" 
                />
            </div>
            <div class="form-group" style="margin-bottom: 15px;">
                <input 
                    placeholder="Full Name" 
                    v-model="name" 
                    class="form-control" 
                    style="width: 100%; padding: 10px; font-size: 1rem;" 
                />
            </div>
            <div class="form-group" style="margin-bottom: 15px;">
                <select 
                    v-model="service_name" 
                    class="form-control" 
                    placeholder='select service name'
                    style="width: 100%; padding: 10px; font-size: 1rem;"
                >
                    <option value="" disabled selected>Select Service Type</option> <br/>
                    <option v-for="service in dropdown_services"   >
                           {{ service }}
                    </option>
                </select>
            </div><br/>
            <div class="form-group" style="margin-bottom: 15px;">
                <input 
                    placeholder="Experience" 
                    v-model="experience" 
                    class="form-control" 
                    style="width: 100%; padding: 10px; font-size: 1rem;" 
                />
            </div>
            <div class="form-group" style="margin-bottom: 15px;">
                <input 
                    placeholder="Address" 
                    v-model="address" 
                    class="form-control" 
                    style="width: 100%; padding: 10px; font-size: 1rem;" 
                />
            </div>
            <div class="form-group" style="margin-bottom: 15px;">
                <input 
                    placeholder="Phone Number"
                    type="number" 
                    v-model="phone_no" 
                    class="form-control" 
                    style="width: 100%; padding: 10px; font-size: 1rem;" 
                />
            </div>
            <div class="form-group" style="margin-bottom: 15px;">
                <input 
                    placeholder="Pincode" 
                    type="number" 
                    v-model="pin_code" 
                    class="form-control" 
                    style="width: 100%; padding: 10px; font-size: 1rem;" 
                />
            </div>
            <button 
                @click="submitRegistration" 
                class="btn btn-primary" 
                style="width: 100%; padding: 10px; font-size: 1rem;">
                Register
            </button>
        </div>
    </div>
    `,
    data() {
        return{
            email: null,
            password: null,
            name: null,
            service_name: null,
            address:null,
            phone_no:null,
            experience:null,
            pin_code: null,
            dropdown_services:[]

        }
    },
    methods:{
        async submitRegistration() {
            const response = await fetch(location.origin + '/profRegister', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password,
                    name: this.name,
                    service_name: this.service_name,
                    address: this.address,
                    phone_no:this.phone_no,
                    experience: this.experience, 
                    pin_code: this.pin_code,
                }),
            });
            if (response.ok) {
                // alert('Registration successful! Please log in.');
                this.$router.push('/login')
            } else {
                const data = await response.json();
                alert(data.message || 'Error registering user.');
            }
        },
        async dropdown(){
            const res= await fetch(location.origin+ `/dropdown/all_services`,
                {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
                }
            )
            if (res.ok){
                console.log('services is showing')
                this.dropdown_services = await res.json()
                console.log(this.dropdown_services)

            } else {
                const data = await res.json();
                alert(data.message || 'Error registering user.');
            }
        }

    },
    mounted(){
        this.dropdown()
    }
};
