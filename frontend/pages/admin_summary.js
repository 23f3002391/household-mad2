export default {
    template:`
    <div>
        <h2>Admin Summary Dashboard</h2>
        
        <div class="chart-container" :style="chart_container"> 
            <h3>Total Requests per Customer</h3>
            <canvas ref="requestsChart"></canvas>
        </div>

        <div class="chart-container" :style="chart_container">
            <h3>Professionals vs. Ratings</h3>
            <canvas ref="ratingsChart"></canvas>
        </div>
    </div>
    
    `,
    data(){
        return{
        requestLabels:[],
        requestValues:[],
        ratingLabels:[],
        ratingValues:[],


        }
        

    },
    computed:{
        chart_container() {
            return{
            width: '80%',
            margin: 'auto',
            padding: '20px'
            }
            
        }

    },
    methods:{
        async fetchReqSummaryData() {
            
                const res= await fetch(location.origin + `/request_summary`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await res.json();

                if (res.ok){
                    this.requestLabels = data.labels;
                    this.requestValues = data.values;
                    this.renderCharts();
                    
                }else{
                    const errorText = await res.text();
                    console.error(`Error: ${res.status} - ${errorText}`);
                }
                
                    
            },
        async fetchRatingSummaryData() {
            const res= await fetch(location.origin + `/rating_summary`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            )
            const data = await res.json();
            if (res.ok){
                this.ratingLabels = data.labels;
                this.ratingValues = data.values;
                this.renderCharts();
               
            }
            else{
                const errorText = await res.text();
                console.error(`Error: ${res.status} - ${errorText}`);
            }

        },
        async renderCharts() {
            console.log("Request Labels:", this.requestLabels);
            console.log("Request Values:", this.requestValues);
            console.log("Rating Labels:", this.ratingLabels);
            console.log("Rating Values:", this.ratingValues);

            if (!this.requestLabels.length || !this.requestValues.length) {
                console.error("Requests data is missing!");
                return;
            }

            if (!this.ratingLabels.length || !this.ratingValues.length) {
                console.error("Ratings data is missing!");
                return;
            }

            // Requests Chart
            new Chart(this.$refs.requestsChart, {
                type: 'bar',
                data: {
                    labels: this.requestLabels,
                    datasets: [{
                        label: "Total Requests",
                        data: this.requestValues,
                        backgroundColor: "rgba(54, 162, 235, 0.6)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1
                    }]
                }
            });
    
            // Ratings Chart
            new Chart(this.$refs.ratingsChart, {
                type: 'bar',
                data: {
                    labels: this.ratingLabels,
                    datasets: [{
                        label: "Ratings",
                        data: this.ratingValues,
                        backgroundColor: "rgba(255, 99, 132, 0.6)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1
                    }]
                }
            });
        }
    },
    mounted() {
        this.fetchReqSummaryData();
        this.fetchRatingSummaryData();
        
    }
    
}
    

    
